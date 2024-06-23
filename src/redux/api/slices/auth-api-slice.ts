import { apiSlice } from "../api";

interface IUser {
  email: string;
  password: string;
  account: string;
}
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ user: { accessToken: string } }, IUser>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),

      transformResponse: (result: { accessToken: string }, meta) => {
        return { user: { accessToken: result.accessToken } };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
