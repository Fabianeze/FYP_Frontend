import { DeepPartial } from "chart.js/dist/types/utils";
import { apiSlice } from "../api";
import { Vehicle } from "./vehicle-api-slice";

interface IDriver {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  status: string;
  profilePhoto: string;
  accessToken: string;
  vehicleId: string;
  vehicle: Vehicle;
}
export interface Driver {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  status: string;
  profilePhoto: string;
  accessToken: string;
  vehicleId: string;
}

const driverApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginDriver: builder.mutation<
      { driver: Partial<IDriver> },
      Partial<IDriver>
    >({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),

      transformResponse: (result: Partial<IDriver>, meta) => {
        return { driver: result };
      },
    }),

    createDriver: builder.mutation<{ message: string }, Partial<IDriver>>({
      query: (body) => ({
        url: "drivers",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Drivers", id: "LIST" }],
    }),
    updateDriver: builder.mutation<{ message: string }, Partial<IDriver>>({
      query: (body) => ({
        url: `drivers/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Drivers", id: "LIST" }],
    }),
    getDriverProfile: builder.query<Partial<IDriver>, null>({
      query: () => ({
        url: "driver/profile",
        method: "GET",
      }),
    }),
    getDriverByID: builder.query<DeepPartial<IDriver>, { id: string }>({
      query: (body) => ({
        url: `drivers/${body.id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Drivers", id: "LIST" },
              { type: "Drivers", id: result.id } as const,
            ]
          : [{ type: "Drivers", id: "LIST" }],
    }),
    getDriverCount: builder.query<{ active: number; inactive: number }, null>({
      query: () => ({
        url: `drivers/count`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: "Drivers", id: "LIST" }]
          : [{ type: "Drivers", id: "LIST" }],
    }),

    getDrivers: builder.query<Partial<IDriver>[], null>({
      query: () => ({
        url: "drivers",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Drivers", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Drivers", id } as const)),
            ]
          : [{ type: "Drivers", id: "LIST" }],
    }),
    getAvailableDrivers: builder.query<Partial<IDriver>[], null>({
      query: () => ({
        url: "drivers/available",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Drivers", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Drivers", id } as const)),
            ]
          : [{ type: "Drivers", id: "LIST" }],
    }),
    deleteDriver: builder.mutation<{ message: string }, { id: string }>({
      query: (params) => ({
        url: `drivers/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Drivers", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginDriverMutation,
  useCreateDriverMutation,
  useGetDriverProfileQuery,
  useGetDriversQuery,
  useDeleteDriverMutation,
  useGetDriverByIDQuery,
  useUpdateDriverMutation,
  useGetDriverCountQuery,
  useGetAvailableDriversQuery,
} = driverApi;
