import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

declare module "@reduxjs/toolkit/query/react" {
  interface FetchBaseQueryError {
    data?: any;
  }
}
