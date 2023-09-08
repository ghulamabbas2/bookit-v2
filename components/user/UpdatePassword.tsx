"use client";

import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const router = useRouter();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      toast.success("Password updated");
      router.refresh();
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwords = { password, oldPassword };

    updatePassword(passwords);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Change Password</h2>

          <div className="mb-3">
            <label className="form-label" htmlFor="old_password_field">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="new_password_field">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn form-btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
