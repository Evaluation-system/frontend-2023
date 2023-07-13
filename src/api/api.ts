import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "helpers/localstorage.helper";

const baseURLS = "http://localhost:3005/";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Project", "Project", "ProjectImage", "Phases", "Tasks"],
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
    updateRole: builder.mutation({
      query: ({ id, patch }) => ({
        body: patch,
        url: `/user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: () => [
        {
          type: "Projects",
        },
      ],
    }),
  }),
});

export const { useUpdateRoleMutation } = api;
