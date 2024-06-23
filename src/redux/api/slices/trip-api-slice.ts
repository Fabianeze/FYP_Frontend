import { DeepPartial } from "chart.js/dist/types/utils";
import { apiSlice } from "../api";
import { Driver } from "./driver-api-slice";
import { Vehicle } from "./vehicle-api-slice";
import { Guest } from "./guest-api-slice";

interface ITrip {
  id: string;
  tripId: string;
  type: string;
  status: string;
  driverId: string;
  from: string;
  to: string;
  startTime: string;
  endTime: string;
  vehicle: Vehicle;
  driver: Driver;
  guest: Guest;
}

const tripApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTrip: builder.mutation<{ message: string }, Partial<ITrip>>({
      query: (body) => ({
        url: "trips",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Trips", id: "LIST" }],
    }),
    updateTrip: builder.mutation<{ message: string }, Partial<ITrip>>({
      query: (body) => ({
        url: `trips/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Trips", id: "LIST" }],
    }),

    getTrips: builder.query<Partial<ITrip>[], null>({
      query: () => ({
        url: "trips",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Trips", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Trips", id } as const)),
            ]
          : [{ type: "Trips", id: "LIST" }],
    }),
    getTripsForGuest: builder.query<DeepPartial<ITrip>[], null>({
      query: (body) => ({
        url: `trips/guest`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Trips", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Trips", id } as const)),
            ]
          : [{ type: "Trips", id: "LIST" }],
    }),
    getNewTripsForDriver: builder.query<DeepPartial<ITrip>[], null>({
      query: (body) => ({
        url: `trips/driver/new`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Trips", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Trips", id } as const)),
            ]
          : [{ type: "Trips", id: "LIST" }],
    }),
    getAllTripsForDriver: builder.query<DeepPartial<ITrip>[], null>({
      query: (body) => ({
        url: `trips/driver/history`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Trips", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Trips", id } as const)),
            ]
          : [{ type: "Trips", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTripsQuery,
  useCreateTripMutation,
  useGetTripsForGuestQuery,
  useGetAllTripsForDriverQuery,
  useGetNewTripsForDriverQuery,
  useUpdateTripMutation,
} = tripApi;
