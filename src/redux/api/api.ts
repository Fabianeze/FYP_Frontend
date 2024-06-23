import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setCredentails } from "../slices/auth-slice";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:2000/",
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const state = (await getState()) as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

   

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraoptions) => {
  let result = await baseQuery(args, api, extraoptions);

  if (result.error?.status === 403) {
    const refreshResult = (await baseQuery(
      "refreshtoken",
      api,
      extraoptions
    )) as QueryReturnValue<{ accessToken: string }, unknown, unknown>;

    if (refreshResult.data) {
      const state = api.getState() as RootState;
      const token = state.auth.token;
      if (token) {
        api.dispatch(setCredentails({ token: refreshResult.data.accessToken }));
      }
    } else {
      if (
        result.error.data &&
        typeof result.error.data == "object" &&
        "message" in result.error.data
      ) {
        toast.error(`${result.error.data.message}`);
      }
      api.dispatch(logout());
    }
    result = await baseQuery(args, api, extraoptions);
  }

  if (result.error?.status === 400) {
    if (
      result.error.data &&
      typeof result.error.data == "object" &&
      "message" in result.error.data
    ) {
      toast.error(`${result.error.data?.message}`);
    }
  }

  if (result.error?.status === 404) {
    if (
      result.error.data &&
      typeof result.error.data == "object" &&
      "message" in result.error.data
    ) {
      toast.error(`${result.error.data?.message}`);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["Drivers","Vehicles",'Trips', "Maintenances"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
