"use client";

import React from "react";
import ButtonLoader from "../layout/ButtonLoader";
import { useFormStatus } from "react-dom";

type Props = {
  text: string;
  className: string;
};

const SubmitButton = ({ text, className }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? <ButtonLoader /> : text}
    </button>
  );
};

export default SubmitButton;
