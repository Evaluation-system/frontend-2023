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
      query: (id) => ({ url: `/projects/${id}` }),

      providesTags: ["Project"],
    }),

    editProject: builder.mutation({
      query: ({ id, patch }) => ({
        body: patch,
        url: `/projects/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: () => [
        {
          type: "Project",
        },
      ],
    }),

    addProjectImage: builder.mutation({
      query: ({ projectId, data }) => ({
        body: data,
        url: `/projects/upload-image/${projectId}`,
        method: "POST",
        credentials: "include",
      }),

      invalidatesTags: ["ProjectImage", "Project"],
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

    getProjectImage: builder.query({
      query: (id) => ({
        url: `/projects/image/${id}`,
        responseHandler: async (response) =>
          URL.createObjectURL(await response.blob()),
      }),

      providesTags: () => [
        {
          type: "ProjectImage",
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
  useAddProjectImageMutation,
  useEditProjectMutation,
  useGetProjectImageQuery,
} = projectApi;
