import NewPassword from "@/components/user/NewPassword";
import React from "react";

export const metadata = {
  title: "Reset Password",
};

interface Props {
  params: { token: string };
}

const NewPasswordPage = ({ params }: Props) => {
  return (
    <div>
      <NewPassword token={params?.token} />
    </div>
  );
};

export default NewPasswordPage;
