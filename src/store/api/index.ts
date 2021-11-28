import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

const baseQuery = fetchBaseQuery({
  baseUrl: `/if-you-see-this-you-should-check-api-url`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).credentials.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["CovidTests", "Vaccine"],
});
