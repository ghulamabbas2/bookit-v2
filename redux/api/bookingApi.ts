import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    newBooking: builder.mutation({
      query(body) {
        return {
          url: "/bookings",
          method: "POST",
          body,
        };
      },
    }),
    checkBookingAvailability: builder.query({
      query({ id, checkInDate, checkOutDate }) {
        return {
          url: `/bookings/check_room_availability?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
        };
      },
    }),
    getBookedDates: builder.query({
      query(id) {
        return {
          url: `/bookings/booked_dates?roomId=${id}`,
        };
      },
    }),
    stripeCheckout: builder.query({
      query({ id, checkoutData }) {
        return {
          url: `/payment/checkout_session/${id}`,
          params: {
            checkInDate: checkoutData.checkInDate,
            checkOutDate: checkoutData.checkOutDate,
            daysOfStay: checkoutData.daysOfStay,
            amount: checkoutData.amount,
          },
        };
      },
    }),

    getSalesStats: builder.query({
      query({ startDate, endDate }) {
        return {
          url: `/admin/sales_stats?startDate=${startDate}&endDate=${endDate}`,
        };
      },
    }),
    deleteBooking: builder.mutation({
      query(id) {
        return {
          url: `/admin/bookings/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useNewBookingMutation,
  useLazyCheckBookingAvailabilityQuery,
  useGetBookedDatesQuery,
  useLazyStripeCheckoutQuery,
  useLazyGetSalesStatsQuery,
  useDeleteBookingMutation,
} = bookingApi;
