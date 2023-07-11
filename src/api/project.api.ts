import { api } from "./api";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query({
      query: (id) => ({ url: `/projects/user/${id}` }),
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
  useGetUserProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
