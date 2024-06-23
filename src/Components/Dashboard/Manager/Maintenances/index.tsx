import { useEffect, useRef, useState } from "react";
import Searchbar from "../../../../Common/searchbar";
import { Form, Formik } from "formik";
import { Input } from "../../../../Common/input";
import * as Yup from "yup";
import { Select } from "../../../../Common/select";
import { useGetVehiclesQuery } from "../../../../redux/api/slices/vehicle-api-slice";
import { toast, ToastContainer } from "react-toastify";
import {
  useCreateMaintenanceMutation,
  useGetMaintenanceByIDQuery,
  useGetMaintenancesQuery,
  useUpdateMaintenanceMutation,
} from "../../../../redux/api/slices/maintenance-api-slice";
import { Textarea } from "../../../../Common/textarea";
import { RadioBox } from "../../../../Common/radioBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDate } from "../../../../utils/getDate";

const MaintenanceComponent = () => {
  const form1Ref = useRef(null);
  const form2Ref = useRef(null);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [infoId, setInfoId] = useState("");
  const [id, setId] = useState("");
  const [createMaintenance] = useCreateMaintenanceMutation();
  const [updateMaintenance] = useUpdateMaintenanceMutation();
  const { data: maintenanceInfo } = useGetMaintenanceByIDQuery(
    { id: infoId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );
  const { data: existingInfo } = useGetMaintenanceByIDQuery(
    { id: editId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  console.log(existingInfo);
  const { data } = useGetMaintenancesQuery(null);
  const { data: vehicles } = useGetVehiclesQuery(null);

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const initialValues = {
    name: "",
    email: "",
    phoneNo: "",
    profilePhoto: null,
    vehicle: "",
  };

  const validationSchema = Yup.object({
    // name: Yup.string().required("Name is required"),
    // email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email is required"),
    // phoneNo: Yup.string().required("Phone number is required"),
  });

  const radioOptions = [
    { option: "Approve", value: "Approved" },
    { option: "Reject", value: "Rejected" },
  ];

  return (
    <>
      <div className="w-full  h-[48px] ">
        <div className="w-[30%]">
          <Searchbar placeholder="Search for maintenances" />
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
              <th className="text-sm font-semibold tracking-wide text-left w-[400px] pt-2 pb-2 ">
                ID
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Driver
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Vehicle
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Action
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
                      setInfoId(maintenance.id as string);
                      setInfo(true);
                    }}
                  >
                    <span className="w-[50px] rounded-[2rem] h-[50px] ps-3"></span>{" "}
                    {maintenance.maintenanceId}
                  </td>
                  <td>{maintenance.driver?.name}</td>
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
                  <td className="flex space-x-2">
                    <div
                      onClick={() => {
                        setEdit(true);
                        setEditId(maintenance.id as string);
                      }}
                      className="cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {info && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">maintenance Info</span>
            </div>
            <div className="flex md:flex-row sm:flex-col ">
              <div className="flex flex-1 flex-col">
                <span>ID</span>
                <span>{maintenanceInfo?.maintenanceId}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Driver</span>
                <span>{maintenanceInfo?.driver?.name}</span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-4">
              <div className="flex flex-1 flex-col">
                <span>Vehicle</span>
                <span className="">{maintenanceInfo?.vehicle?.plateNo}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Status</span>
                <span
                  className={
                    maintenanceInfo?.status === "Approved"
                      ? "bg-green-200 p-[0.1rem] ps-2 w-[22%] rounded-lg text-[green]"
                      : ""
                  }
                >
                  {maintenanceInfo?.status}
                </span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-3 ">
              <div className="flex flex-1 flex-col">
                <span>Vehicle Make</span>
                <span>{maintenanceInfo?.vehicle?.make}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Vehicle Model</span>
                <span>{maintenanceInfo?.vehicle?.model}</span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-3 ">
              <div className="flex flex-1 flex-col">
                <span>Vehicle Plate Number</span>
                <span>{maintenanceInfo?.vehicle?.plateNo}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Vehicle Status</span>
                <span>{maintenanceInfo?.vehicle?.status}</span>
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
      {edit && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50  flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] h-[35rem] rounded shadow-lg">
            {existingInfo ? (
              <>
                {console.log("form", existingInfo)}
                <div className="mb-4 border-b ">
                  <span className="text-[2rem]">Edit Driver</span>
                </div>
                <Formik
                  initialValues={{
                    description: existingInfo.description,
                    startTime: null,
                    endTime: null,
                    comment: "",
                    radio: "",
                  }}
                  validationSchema={validationSchema}
                  innerRef={form2Ref}
                  onSubmit={async (values) => {
                    try {
                      const date = getDate();
                      const result = await updateMaintenance({
                        id: editId,
                        status: values.radio,
                        comment: values.comment,
                        startTime: values.radio === "Accepted" ? date : "",
                      }).unwrap();
                      if (result) {
                        toast.success(result.message);
                        setEdit(false);
                        setEditId("");
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
                        <div className="h-[4rem] mb-4">
                          <Textarea
                            name="description"
                            value={formikProps.values.description}
                            label="d"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                            disabled={true}
                          />
                        </div>
                        <div className="flex space-x-3 justify-center">
                          <RadioBox options={radioOptions} name="radio" />
                        </div>
                        {/* <div className="flex md:flex-row sm:flex-col ">
                          <div className="flex ">
                            <span>Start Time</span>
                            <DatePicker
                              showTimeSelect
                              className="ps-2"
                              selected={formikProps.values.startTime}
                              onChange={(date) =>
                                formikProps.setFieldValue("startTime", date)
                              }
                              dateFormat="Pp"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span>End Time</span>
                            <span>{driverInfo?.email}</span>
                          </div> 
                        </div> */}
                        <div className="mb-2">
                          <span>Comment</span>
                        </div>
                        <div className="h-[4rem] mb-4">
                          <Textarea
                            name="comment"
                            value={formikProps.values.comment}
                            label="Comment"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                          />
                        </div>

                        <div className="flex justify-end mt-5">
                          <button
                            type="button"
                            onClick={() => {
                              setEdit(false);
                              setEditId("");
                            }}
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
              </>
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MaintenanceComponent;
