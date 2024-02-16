import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const baseAPi = createApi({
  reducerPath: "baseAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/sports-items",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).Auth.accessToken;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["SportsItem", "saleshistory"],
  endpoints: () => ({}),
});
