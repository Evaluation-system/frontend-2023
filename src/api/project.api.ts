import { api } from "./api";

export const projectApi = api.injectEndpoints({
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
