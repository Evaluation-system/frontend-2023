import { api } from "./api";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectPhases: builder.query({
      query: (id) => ({ url: `phase/project/${id}` }),

      providesTags: () => [
        {
          type: "Phases",
        },
      ],
    }),

    getPhaseTasks: builder.query({
      query: (phaseId) => ({ url: `phase-tasks/project/${phaseId}` }),

      providesTags: () => [
        {
          type: "Tasks",
        },
      ],
    }),

    deletePhase: builder.mutation({
      query: (id) => ({
        url: `/phase/${id}`,
        method: "DELETE",
        credentials: "include",
      }),

      invalidatesTags: () => [
        {
          type: "Phases",
        },
      ],
    }),

    deletePhaseTask: builder.mutation({
      query: (id) => ({
        url: `/phase-tasks/${id}`,
        method: "DELETE",
        credentials: "include",
      }),

      invalidatesTags: () => [
        {
          type: "Tasks",
        },
      ],
    }),

    createPhase: builder.mutation({
      query: (data) => ({
        body: data,
        url: "/phase",
        method: "POST",
        credentials: "include",
      }),

      invalidatesTags: () => [
        {
          type: "Phases",
        },
      ],
    }),

    createPhaseTask: builder.mutation({
      query: (data) => ({
        body: data,
        url: "/phase-tasks",
        method: "POST",
        credentials: "include",
      }),

      invalidatesTags: () => [
        {
          type: "Tasks",
        },
      ],
    }),
  }),
});

export const {
  useCreatePhaseMutation,
  useGetProjectPhasesQuery,
  useGetPhaseTasksQuery,
  useDeletePhaseTaskMutation,
  useCreatePhaseTaskMutation,
  useDeletePhaseMutation,
} = projectApi;
