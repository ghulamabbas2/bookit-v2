import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Booking, { IBooking } from "../models/booking";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);

// Create new Booking   =>  /api/bookings
export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  return NextResponse.json({
    booking,
  });
});

// Check Room Booking Availability   =>  /api/bookings/check
export const checkRoomBookingAvailability = catchAsyncErrors(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    const checkInDate: Date = new Date(
      searchParams.get("checkInDate") as string
    );
    const checkOutDate: Date = new Date(
      searchParams.get("checkOutDate") as string
    );

    const bookings: IBooking[] = await Booking.find({
      room: roomId,
      $and: [
        { checkInDate: { $lte: checkOutDate } },
        { checkOutDate: { $gte: checkInDate } },
      ],
    });

    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
      isAvailable,
    });
  }
);

// Get room booked dates   =>  /api/bookings/get_booked_dates
export const getRoomBookedDates = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await Booking.find({ room: roomId });

  const bookedDates = bookings.flatMap((booking) =>
    Array.from(
      moment
        .range(moment(booking.checkInDate), moment(booking.checkOutDate))
        .by("day")
    )
  );

  return NextResponse.json({
    bookedDates,
  });
});

// Get current user bookings   =>  /api/bookings/me
export const myBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find({ user: req.user._id });

  return NextResponse.json({
    bookings,
  });
});

// Get booking details   =>  /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id).populate("user room");

    if (
      booking.user?._id?.toString() !== req.user._id &&
      req?.user?.role !== "admin"
    ) {
      throw new ErrorHandler("You can not view this booking", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);

const getLastSixMonthsSales = async () => {
  const last6MonthsSales: any = [];

  // Get Current date
  const currentDate = moment();

  async function fetchSalesForMonth(
    startDate: moment.Moment,
    endDate: moment.Moment
  ) {
    const result = await Booking.aggregate([
      // Stage 1 => Filter the data
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        },
      },
      // Stage 2: Grouping the data
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$amountPaid" },
          numOfBookings: { $sum: 1 },
        },
      },
    ]);

    const { totalSales, numOfBookings } =
      result?.length > 0 ? result[0] : { totalSales: 0, numOfBookings: 0 };

    last6MonthsSales.push({
      monthName: startDate.format("MMMM"),
      totalSales,
      numOfBookings,
    });
  }

  for (let i = 0; i < 6; i++) {
    const startDate = moment(currentDate).startOf("month");
    const endDate = moment(currentDate).endOf("month");

    await fetchSalesForMonth(startDate, endDate);

    currentDate.subtract(1, "months");
  }

  return last6MonthsSales;
};

const getTopPerformingRooms = async (startDate: Date, endDate: Date) => {
  const topRooms = await Booking.aggregate([
    // Stage 1: Filter documents within start and end date
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    // Stage 2: Group documents by room
    {
      $group: {
        _id: "$room",
        bookingsCount: { $sum: 1 },
      },
    },

    // Stage 3: Sort documents by bookingsCount in descending order
    {
      $sort: { bookingsCount: -1 },
    },
    // Stage 4: Limit the documents
    {
      $limit: 3,
    },
    // Stage 5: Retrieve additional data from rooms collection like room name
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "_id",
        as: "roomData",
      },
    },
    // Stage 6: Takes roomData and deconstructs into documents
    {
      $unwind: "$roomData",
    },
    // Stage 7: Shape the output document (include or exclude the fields)
    {
      $project: {
        _id: 0,
        roomName: "$roomData.name",
        bookingsCount: 1,
      },
    },
  ]);

  return topRooms;
};

// Get sales stats   =>  /api/admin/sales_stats
export const getSalesStats = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const numberOfBookings = bookings.length;
  const totalSales = bookings.reduce(
    (acc, booking) => acc + booking.amountPaid,
    0
  );

  const sixMonthSalesData = await getLastSixMonthsSales();
  const topRooms = await getTopPerformingRooms(startDate, endDate);

  return NextResponse.json({
    numberOfBookings,
    totalSales,
    sixMonthSalesData,
    topRooms,
  });
});

// Get admin bookings   =>  /api/admin/bookings
export const allAdminBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find();

  return NextResponse.json({
    bookings,
  });
});

// Delete booking   =>  /api/admin/bookings/:id
export const deleteBooking = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id);

    if (!booking) {
      throw new ErrorHandler("Booking not found with this ID", 404);
    }

    await booking?.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
