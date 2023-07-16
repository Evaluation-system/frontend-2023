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
      query: (phaseId) => ({ url: `phase-tasks/phase/${phaseId}` }),

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

    editPhaseMetric: builder.mutation({
      query: ({ id, patch }) => ({
        body: patch,
        url: `/phase/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: () => [
        {
          type: "Metric",
        },
      ],
    }),
    editPhaseTask: builder.mutation({
      query: ({ id, patch }) => ({
        body: patch,
        url: `/phase-tasks/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: () => [
        {
          type: "Tasks",
        },
      ],
    }),

    getPhaseMetric: builder.query({
      query: (phaseId) => ({ url: `phase/${phaseId}` }),

      providesTags: () => [
        {
          type: "Metric",
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
  useGetPhaseMetricQuery,
  useEditPhaseMetricMutation,
  useEditPhaseTaskMutation,
  useCreatePhaseMutation,
  useGetProjectPhasesQuery,
  useGetPhaseTasksQuery,
  useDeletePhaseTaskMutation,
  useCreatePhaseTaskMutation,
  useDeletePhaseMutation,
} = projectApi;
