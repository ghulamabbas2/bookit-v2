"use client";

import {
  useLazyUpdateSessionQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import { setUser } from "@/redux/features/userSlice";
import { CustomError } from "@/interfaces/customError";
import { updateUserProfile } from "@/actions/actions";
import SubmitButton from "../form/SubmitButton";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  if (data) dispatch(setUser(data?.user));

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setEmail(currentUser?.email);
    }

    if (error && "data" in error) {
      const customError = error.data as CustomError;
      toast.error(customError.errMessage);
    }

    // if (isSuccess) {
    //   //@ts-ignore
    //   updateSession();

    //   router.refresh();
    // }
  }, [currentUser, error, isSuccess]);

  // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const userData = { name, email };

  //   updateProfile(userData);
  // };

  const submitHandler = async (formData: FormData) => {
    const res = await updateUserProfile(currentUser?._id, formData);

    if (res?.error) {
      toast.error(res?.error);
    }

    if (res?.isUpdated) {
      //@ts-ignore
      updateSession();

      router.refresh();
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" action={submitHandler}>
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              defaultValue={name}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              defaultValue={email}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <SubmitButton text="Update" className="btn form-btn w-100 py-2" />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
