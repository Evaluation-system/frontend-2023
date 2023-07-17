import { api } from "./api";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        body: userData,
        url: "/auth/register",
        method: "POST",
        // credentials: "include",
      }),

      //   invalidatesTags: () => [
      //     {
      //       type: "Tasks",
      //     },
      //   ],
    }),

    login: builder.mutation({
      query: (userData) => ({
        body: userData,
        url: "/auth/log-in",
        method: "POST",
        // credentials: "include",
      }),

      //   invalidatesTags: () => [
      //     {
      //       type: "Tasks",
      //     },
      //   ],
    }),

    getMe: builder.query({
      query: () => ({ url: `auth` }),

      //   providesTags: () => [
      //     {
      //       type: "Phases",
      //     },
      //   ],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } =
  projectApi;
