import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

const baseURLS = "http://localhost:3005/";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Projects"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLS,
    prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: () => [
        {
          type: "Projects",
        },
      ],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        body: data,
        url: "/projects",
        method: "POST",
      }),
      invalidatesTags: () => [
        {
          type: "Projects",
        },
      ],
    }),

    // deleteProject: builder.mutation({

    // }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = api;
