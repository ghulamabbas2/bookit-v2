import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    canUserReview: builder.query({
      query(id) {
        return {
          url: `/reviews/can_review?roomId=${id}`,
        };
      },
    }),
    postReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
    }),
    newRoom: builder.mutation({
      query(body) {
        return {
          url: "/admin/rooms",
          method: "POST",
          body,
        };
      },
    }),
    updateRoom: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/rooms/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    uploadRoomImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/rooms/${id}/upload_images`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteRoomImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/rooms/${id}/delete_image`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteRoom: builder.mutation({
      query(id) {
        return {
          url: `/admin/rooms/${id}`,
          method: "DELETE",
        };
      },
    }),
    getRoomReviews: builder.query({
      query(id) {
        return {
          url: `admin/rooms/reviews?roomId=${id}`,
        };
      },
      providesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query({ id, roomId }) {
        return {
          url: `/admin/rooms/reviews/?id=${id}&roomId=${roomId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useCanUserReviewQuery,
  useNewRoomMutation,
  useUpdateRoomMutation,
  useUploadRoomImagesMutation,
  useDeleteRoomImageMutation,
  useDeleteRoomMutation,
  useLazyGetRoomReviewsQuery,
  useDeleteReviewMutation,
} = roomApi;
