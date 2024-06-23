import { apiSlice } from "../api";

interface IGuest {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Guest {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const guestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginGuest: builder.mutation<{ guest: Partial<IGuest> }, Partial<IGuest>>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),

      transformResponse: (result: Partial<IGuest>, meta) => {
        return { guest: result };
      },
    }),

    createGuest: builder.mutation<{ message: string }, Partial<IGuest>>({
      query: (body) => ({
        url: "guests",
        method: "POST",
        body,
      }),
    }),

    getGuests: builder.query<Partial<IGuest>[], null>({
      query: () => ({
        url: "guests",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginGuestMutation,
  useGetGuestsQuery,
  useCreateGuestMutation,
} = guestApi;
