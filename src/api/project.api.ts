import { api } from "./api";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: () => [
        {
          type: "Projects",
        },
      ],
    }),

    getProject: builder.query({
      query: (id) => `/projects/${id}`,
    }),

    createProject: builder.mutation({
      query: (data) => ({
        body: data,
        url: "/projects",
        method: "POST",
        credentials: "include",
      }),

      invalidatesTags: () => [
        {
          type: "Projects",
        },
      ],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
        credentials: "include",
      }),

      invalidatesTags: () => [
        {
          type: "Projects",
        },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
