import { DeepPartial } from "chart.js/dist/types/utils";
import { apiSlice } from "../api";
import { Vehicle } from "./vehicle-api-slice";
import { Driver } from "./driver-api-slice";

interface IMaintenance {
  id: string;
  maintenanceId: string;
  description: string;
  driverId: string;
  driver: Driver;
  vehicleId: string;
  createdAt: number;
  updatedAt: number;
  startTime: string;
  endTime: string;
  status: string;
  comment: string;
  vehicle: Vehicle;
}
export interface Maintenance {
  id: string;
  description: string;
  driverId: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: number;
  updatedAt: number;
}

const maintenanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMaintenance: builder.mutation<
      { message: string },
      Partial<IMaintenance>
    >({
      query: (body) => ({
        url: "maintenances",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Maintenances", id: "LIST" }],
    }),
    updateMaintenance: builder.mutation<
      { message: string },
      Partial<IMaintenance>
    >({
      query: (body) => ({
        url: `maintenances/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Maintenances", id: "LIST" }],
    }),
    getMaintenanceByID: builder.query<
      DeepPartial<IMaintenance>,
      { id: string }
    >({
      query: (body) => ({
        url: `maintenances/${body.id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Maintenances", id: "LIST" },
              { type: "Maintenances", id: result.id } as const,
            ]
          : [{ type: "Maintenances", id: "LIST" }],
    }),
    getMaintenancesForDriver: builder.query<DeepPartial<IMaintenance>[], null>({
      query: (body) => ({
        url: `maintenances/driver`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Maintenances", id: "LIST" },
              ...result.map(
                ({ id }) => ({ type: "Maintenances", id } as const)
              ),
            ]
          : [{ type: "Maintenances", id: "LIST" }],
    }),

    getMaintenanceCount: builder.query<
      { pendingCount: number; approvedCount: number; rejectedCount: number },
      null
    >({
      query: () => ({
        url: `maintenances/count`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: "Maintenances", id: "LIST" }]
          : [{ type: "Maintenances", id: "LIST" }],
    }),

    getMaintenances: builder.query<Partial<IMaintenance>[], null>({
      query: () => ({
        url: "maintenances",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Maintenances", id: "LIST" },
              ...result.map(
                ({ id }) => ({ type: "Maintenances", id } as const)
              ),
            ]
          : [{ type: "Maintenances", id: "LIST" }],
    }),
    deleteMaintenance: builder.mutation<{ message: string }, { id: string }>({
      query: (params) => ({
        url: `maintenances/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Maintenances", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateMaintenanceMutation,
  useGetMaintenancesQuery,
  useDeleteMaintenanceMutation,
  useGetMaintenanceByIDQuery,
  useUpdateMaintenanceMutation,
  useGetMaintenanceCountQuery,
  useGetMaintenancesForDriverQuery,
} = maintenanceApi;
