import { apiSlice } from "../api";

interface IManager {
  id: string;
  email: string;
  name: string;
  password: string;
  phoneNo: string;
  status: string;
  profilePhoto: string;
  createdAt: Date;
  updatedAt: Date;
}
const managerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginManager: builder.mutation<
      { Manager: Partial<IManager> },
      { accessToken: string }
    >({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),

      transformResponse: (result: Partial<IManager>, meta) => {
        return { Manager: result };
      },
    }),

    createManager: builder.mutation<{ message: string }, Partial<IManager>>({
      query: (body) => ({
        url: "managers",
        method: "POST",
        body,
      }),
    }),

    getManagerProfile: builder.query<Partial<IManager>, null>({
      query: () => ({
        url: "manager/profile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginManagerMutation,
  useGetManagerProfileQuery,
  useCreateManagerMutation,
} = managerApi;
