import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Projects"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
  }),

  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/",
    }),
    createProject: builder.mutation({
      query: (project) => ({
        body: project,
        url: "/",
        method: "POST",
      }),
    }),
  }),
});
