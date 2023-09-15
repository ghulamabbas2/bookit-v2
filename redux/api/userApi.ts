import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
    }),
    updateSession: builder.query({
      query() {
        return {
          url: "/auth/session?update",
        };
      },
    }),
    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/me/update_password",
          method: "PUT",
          body,
        };
      },
    }),
    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: "/me/upload_avatar",
          method: "PUT",
          body,
        };
      },
    }),
    updateUser: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/users/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useLazyUpdateSessionQuery,
  useUpdatePasswordMutation,
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
