import { useEffect, useRef, useState } from "react";
import Searchbar from "../../../../Common/searchbar";
import { Field, Form, Formik } from "formik";
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
import {
  useCreateMaintenanceMutation,
  useUpdateMaintenanceMutation,
  useGetMaintenanceByIDQuery,
  useGetMaintenancesQuery,
  useGetMaintenancesForDriverQuery,
} from "../../../../redux/api/slices/maintenance-api-slice";
import { Textarea } from "../../../../Common/textarea";
import { getDate } from "../../../../utils/getDate";

const DriverMaintenanceComponent = () => {
  const form1Ref = useRef(null);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoId, setInfoId] = useState("");
  const [createMaintenance] = useCreateMaintenanceMutation();
  const [updateMaintenance] = useUpdateMaintenanceMutation();
  const { data: maintenanceInfo } = useGetMaintenanceByIDQuery(
    { id: infoId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );
  const { data } = useGetMaintenancesForDriverQuery(null);
  console.log(data);

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const updateEndTime = async (endTime: string, id: string) => {
    try {
      const result = await updateMaintenance({
        id,
        endTime,
      }).unwrap();
      if (result) {
        toast.success(result.message);
      }
    } catch (err) {
      // if (err && typeof err === 'object' && 'data' in err && err.data && typeof err.data === 'object' && 'message' in err.data) {
      // } else {
      //   console.log('An error occurred:', err);
      // }
    }
  };

  const initialValues = {
    description: "",
  };

  const validationSchema = Yup.object({
    // name: Yup.string().required("Name is required"),
    // email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email is required"),
    // phoneNo: Yup.string().required("Phone number is required"),
    // profilePhoto: Yup.mixed()
    //   .required("Profile photo is required")
    //   .test(
    //     "fileType",
    //     "Unsupported File Format. Only jpg and png are allowed.",
    //     (value) => {
    //       return value && (value === "image/jpeg" || value === "image/png");
    //     }
    //   ),
  });

  return (
    <>
      <div className="w-full  h-[48px] ">
        <div className="w-[30%]">
          <Searchbar placeholder="Search for Drivers" />
        </div>
      </div>
      <div className="bg-neutral-50 rounded-[20px] h-[6rem] items-center ps-5 pe-5 mt-5 flex justify-between">
        <div>
          <span>Sort By</span>
        </div>
        <div>
          <button
            onClick={handleShow}
            className="bg-[#470A34] rounded flex p-2 items-center text-[#FFFFFF]"
          >
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="white"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
            Request Maintenance
          </button>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto mt-4">
        <table className="table-auto w-[100%]">
          <thead className="">
            <tr className=" ">
              <th className="text-sm font-semibold tracking-wide text-left w-[400px] pt-2 pb-2 ">
                ID
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
              data.map((maintenance) => (
                <tr>
                  <td
                    className="cursor-pointer"
                    onClick={() => {
                      setInfo(true);
                    }}
                  >
                    <span className="w-[50px] rounded-[2rem] h-[50px] ps-3"></span>{" "}
                    {maintenance.maintenanceId}
                  </td>
                  <td>{maintenance.vehicle?.plateNo}</td>
                  <td>
                    <span
                      className={
                        maintenance.status === "Accepted"
                          ? "bg-green-200 p-2 rounded-lg text-[green]"
                          : maintenance.status === "Rejected"
                          ? "bg-[#ffb3b3] p-2 rounded-lg text-[#ff0000]"
                          : "bg-[#ffffcc] p-2 rounded-lg text-[#e6e600]"
                      }
                    >
                      {maintenance.status}
                    </span>
                  </td>
                  <td>{maintenance.startTime}</td>
                  <td>
                    {maintenance.endTime === "" &&
                    maintenance.status === "Accepted" ? (
                      <button
                        onClick={() => {
                          updateEndTime(getDate(), maintenance.id as string);
                        }}
                        className="pt-1 pb-1 ps-2 pe-2 bg-[#470A34] text-[white] rounded-lg"
                      >
                        Finish
                      </button>
                    ) : maintenance.endTime !== "" &&
                      maintenance.status === "Accepted" ? (
                      maintenance.endTime
                    ) : (
                      "----"
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">Request Maintenance</span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                console.log(values);
                try {
                  const result = await createMaintenance({
                    description: values.description,
                  }).unwrap();

                  if (result) {
                    toast.success(result.message);
                    handleHide();
                  }
                } catch (err) {
                  // if (err && typeof err === 'object' && 'data' in err && err.data && typeof err.data === 'object' && 'message' in err.data) {
                  // } else {
                  //   console.log('An error occurred:', err);
                  // }
                }
              }}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <div className="mb-2">
                      <span>Description</span>
                    </div>
                    <div className="h-[10rem] mb-5">
                      <Textarea
                        name="description"
                        style={{ border: "1px solid grey", height: "8rem" }}
                      />
                    </div>
                    <div className="flex justify-end mt-5">
                      <button
                        onClick={handleHide}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#470A34]  text-white px-4 py-2 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
      {info && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">Maintenance Info</span>
            </div>
            <div className="flex md:flex-row sm:flex-col ">
              <div className="flex flex-1 flex-col">
                <span>ID</span>
                <span>{maintenanceInfo?.id}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Vehicle</span>
                <span>{maintenanceInfo?.vehicle?.plateNo}</span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-4">
              <div className="flex flex-1 flex-col">
                <span>Start Time</span>
                <span className="">{maintenanceInfo?.startTime}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>End Time</span>
                <span className="">{maintenanceInfo?.endTime}</span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-3 ">
              <div className="flex flex-1 flex-col">
                <span>Status</span>
                <span
                  className={
                    maintenanceInfo?.status === "Active"
                      ? "bg-green-200 p-[0.1rem] ps-2 w-[22%] rounded-lg text-[green]"
                      : ""
                  }
                >
                  {maintenanceInfo?.status}
                </span>
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

export default DriverMaintenanceComponent;
