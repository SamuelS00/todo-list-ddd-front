import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = `http://localhost:3000`;
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Todos"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({ baseUrl }),
});