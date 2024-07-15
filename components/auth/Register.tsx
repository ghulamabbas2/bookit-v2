"use client";

import { useRegisterMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import { registerUser } from "@/actions/actions";
import { CustomError } from "@/interfaces/customError";
import SubmitButton from "../form/SubmitButton";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const router = useRouter();

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const customError = error.data as CustomError;
      toast.error(customError.errMessage);
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Account Registered. You can login now");
    }
  }, [error, isSuccess]);

  // const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const userData = {
  //     name,
  //     email,
  //     password,
  //   };

  //   register(userData);
  // };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (formData: FormData) => {
    const res = await registerUser(formData);

    if (res?.error) return toast.error(res?.error);

    if (res?.isCreated) {
      router.push("/login");
      toast.success("Account Registered. You can login now");
    }
  };

  return (
    <div className="wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" action={submitHandler}>
          <h2 className="mb-4">Join Us</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              {" "}
              Full Name{" "}
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              // value={name}
              // onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              // value={email}
              // onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password_field">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              // value={password}
              // onChange={onChange}
              // disabled={isLoading}
            />
          </div>

          <SubmitButton text="Register" className="btn form-btn w-100 py-2" />
        </form>
      </div>
    </div>
  );
};

export default Register;
