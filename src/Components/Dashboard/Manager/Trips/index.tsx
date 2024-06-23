import { useEffect, useRef, useState } from "react";
import Searchbar from "../../../../Common/searchbar";
import { Form, Formik } from "formik";
import { Input } from "../../../../Common/input";
import * as Yup from "yup";
import {
  useCreateDriverMutation,
  useDeleteDriverMutation,
  useGetDriverByIDQuery,
  useGetDriversQuery,
  useUpdateDriverMutation,
} from "../../../../redux/api/slices/driver-api-slice";
import { Select } from "../../../../Common/select";
import { useGetVehiclesQuery } from "../../../../redux/api/slices/vehicle-api-slice";
import { toast, ToastContainer } from "react-toastify";
import { useGetTripsQuery } from "../../../../redux/api/slices/trip-api-slice";

const TripsComponent = () => {
  const [editId, setEditId] = useState("");
  const [info, setInfo] = useState(false);
  const [infoId, setInfoId] = useState("");
  const { data: driverInfo } = useGetDriverByIDQuery(
    { id: infoId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );
  const { data: existingInfo } = useGetDriverByIDQuery(
    { id: editId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );
  console.log(existingInfo);
  const { data } = useGetTripsQuery(null);
  console.log(data)
  const { data: vehicles } = useGetVehiclesQuery(null);

  useEffect(() => {
    console.log(editId);
  }, [editId]);
  return (
    <>
      <div className="w-full  h-[48px] ">
        <div className="w-[30%]">
          <Searchbar placeholder="Search for Trips" />
        </div>
      </div>
      <div className="bg-neutral-50 rounded-[20px] h-[6rem] items-center ps-5 pe-5 mt-5 flex justify-between">
        <div>
          <span>Sort By</span>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto mt-4">
        <table className="table-auto w-[100%]">
          <thead className="">
            <tr className=" ">
              <th className="text-sm font-semibold tracking-wide text-left pt-2 pb-2 ">
                ID
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Guest Name
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Driver Name
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Vehicle
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Start Time
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                End Time
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data &&
              data.map((trip) => (
                <tr>
                  <td
                    className="cursor-pointer"
                    onClick={() => {
                      setInfoId(trip.id as string);
                      setInfo(true);
                      console.log("exisiting", existingInfo);
                    }}
                  >
                    <span className="w-[50px] rounded-[2rem] h-[50px] ps-3"></span>{" "}
                    {trip.tripId}
                  </td>
                  <td>{trip.guest?.name}</td>
                  <td>{trip.driver?.name}</td>
                  <td>{trip.vehicle?.plateNo}</td>
                  <td>
                    <span
                      className={
                        trip.status === "Completed"
                          ? "bg-green-200 p-1 rounded text-[green]"
                          : trip.status === "Rejected"
                          ? "bg-[#ffb3b3] p-1 rounded-lg text-[#ff0000]"
                          : "bg-[#ffffcc] p-1 rounded-lg text-[#e6e600]"
                      }
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td>{trip.startTime}</td>
                  <td>{trip.endTime}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {info && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">Driver Info</span>
            </div>
            <div className="flex md:flex-row sm:flex-col ">
              <div className="flex flex-1 flex-col">
                <span>Name</span>
                <span>{driverInfo?.name}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Email</span>
                <span>{driverInfo?.email}</span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-4">
              <div className="flex flex-1 flex-col">
                <span>Phone Number</span>
                <span className="">{driverInfo?.phoneNo}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Status</span>
                <span
                  className={
                    driverInfo?.status === "Active"
                      ? "bg-green-200 p-[0.1rem] ps-2 w-[22%] rounded-lg text-[green]"
                      : ""
                  }
                >
                  {driverInfo?.status}
                </span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-3 ">
              <div className="flex flex-1 flex-col">
                <span>Vehicle Make</span>
                <span>{driverInfo?.vehicle?.make}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Vehicle Model</span>
                <span>{driverInfo?.vehicle?.model}</span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-3 ">
              <div className="flex flex-1 flex-col">
                <span>Vehicle Plate Number</span>
                <span>{driverInfo?.vehicle?.plateNo}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Vehicle Status</span>
                <span>{driverInfo?.vehicle?.status}</span>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setInfo(false);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default TripsComponent;
