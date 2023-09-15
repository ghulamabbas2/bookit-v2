"use client";

import { IBooking } from "@/backend/models/booking";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    booking: IBooking;
  };
}

const BookingDetails = ({ data }: Props) => {
  const booking = data?.booking;
  const { user } = useAppSelector((state) => state.auth);

  const isPaid = booking?.paymentInfo?.status === "paid" ? true : false;

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 booking-details">
          <div className="d-flex justify-content-between align-items-center my-5">
            <h2>Booking # {booking?._id}</h2>
            <Link
              className="btn btn-success"
              href={`/bookings/invoice/${booking?._id}`}
            >
              <i className="fa fa-print"></i> Invoice
            </Link>
          </div>

          <h4 className="mt-5 mb-4">User Info</h4>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name:</th>
                <td>{booking?.user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{booking?.user?.email}</td>
              </tr>
              <tr>
                <th scope="row">Amount Paid:</th>
                <td>${booking?.amountPaid}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="mt-5 mb-4">Booking Info</h4>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Check In:</th>
                <td>
                  {new Date(booking?.checkInDate).toLocaleString("en-US")}
                </td>
              </tr>
              <tr>
                <th scope="row">Check Out:</th>
                <td>
                  {new Date(booking?.checkOutDate).toLocaleString("en-US")}
                </td>
              </tr>
              <tr>
                <th scope="row">Days of Stay:</th>
                <td>{booking?.daysOfStay}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="mt-5 mb-4">Payment Info:</h4>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status:</th>
                <td>
                  <b className={isPaid ? "greenColor" : "redColor"}>
                    {isPaid ? "Paid" : "Not Paid"}
                  </b>
                </td>
              </tr>
              {user?.role === "admin" && (
                <tr>
                  <th scope="row">Stripe ID:</th>
                  <td>
                    <b className="redColor">{booking?.paymentInfo.id}</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h4 className="mt-5 mb-4">Booked Room:</h4>

          <hr />

          {booking?.room ? (
            <div className="cart-item my-1">
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <Image
                    src={booking?.room?.images[0]?.url}
                    alt={booking?.room?.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <Link href={`/rooms/${booking?.room?._id}`}>
                    {booking?.room?.name}
                  </Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${booking?.room?.pricePerNight}</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{booking?.daysOfStay} Day(s)</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-danger">Room no longer exist</div>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
