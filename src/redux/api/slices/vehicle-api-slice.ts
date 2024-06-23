import { DeepPartial } from "chart.js/dist/types/utils";
import { apiSlice } from "../api";
import { Driver } from "./driver-api-slice";

interface IVehicle {
  id: string;
  plateNo: string;
  color: string;
  model: string;
  make: string;
  status: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  driver: Driver;
}
export interface Vehicle {
  id: string;
  plateNo: string;
  color: string;
  model: string;
  make: string;
  status: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const vehicleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginVehicle: builder.mutation<
      { vehicle: Partial<IVehicle> },
      Partial<IVehicle>
    >({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),

      transformResponse: (result: Partial<IVehicle>, meta) => {
        return { vehicle: result };
      },
    }),

    createVehicle: builder.mutation<{ message: string }, Partial<IVehicle>>({
      query: (body) => ({
        url: "vehicles",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Vehicles", id: "LIST" }],
    }),
    updateVehicle: builder.mutation<{ message: string }, Partial<IVehicle>>({
      query: (body) => ({
        url: `vehicles/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Vehicles", id: "LIST" }],
    }),

    getVehicles: builder.query<Partial<IVehicle>[], null>({
      query: () => ({
        url: "vehicles",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Vehicles", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Vehicles", id } as const)),
            ]
          : [{ type: "Vehicles", id: "LIST" }],
    }),
    getVehicleByID: builder.query<DeepPartial<IVehicle>, { id: string }>({
      query: (body) => ({
        url: `vehicles/${body.id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Vehicles", id: "LIST" },
              { type: "Vehicles", id: result.id } as const,
            ]
          : [{ type: "Vehicles", id: "LIST" }],
    }),
    deleteVehicle: builder.mutation<{ message: string }, { id: string }>({
      query: (params) => ({
        url: `vehicles/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Vehicles", id: "LIST" }],
    }),
    getVehicleCount: builder.query<
      { active: number; inactive: number; outofservice: number },
      null
    >({
      query: () => ({
        url: `vehicles/count`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: "Vehicles", id: "LIST" }]
          : [{ type: "Vehicles", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginVehicleMutation,
  useGetVehiclesQuery,
  useCreateVehicleMutation,
  useGetVehicleByIDQuery,
  useDeleteVehicleMutation,
  useGetVehicleCountQuery,
  useUpdateVehicleMutation,
} = vehicleApi;
