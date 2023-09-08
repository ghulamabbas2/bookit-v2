import { IUser } from "@/backend/models/user";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user: IUser;
  }
}

declare module "@reduxjs/toolkit/query/react" {
  interface FetchBaseQueryError {
    data?: any;
  }
}
