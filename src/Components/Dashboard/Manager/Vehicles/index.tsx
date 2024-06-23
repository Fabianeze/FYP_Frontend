import Searchbar from "../../../../Common/searchbar";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { Input } from "../../../../Common/input";
import * as Yup from "yup";
import { Select } from "../../../../Common/select";
import {
  useCreateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehicleByIDQuery,
  useGetVehiclesQuery,
  useUpdateVehicleMutation,
} from "../../../../redux/api/slices/vehicle-api-slice";
import { ToastContainer, toast } from "react-toastify";

const VehicleComponent = () => {
  const form1Ref = useRef(null);
  const form2Ref = useRef(null);
  const [show, setShow] = useState(false);
  const [deletee, setDeletee] = useState(false);
  const [info, setInfo] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [infoId, setInfoId] = useState("");
  const [id, setId] = useState("");
  const [createVehicle] = useCreateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();
  const { data } = useGetVehiclesQuery(null);
  const { data: vehicleInfo, error } = useGetVehicleByIDQuery(
    { id: infoId },
    { refetchOnMountOrArgChange: true }
  );

  const { data: existingInfo } = useGetVehicleByIDQuery(
    { id: editId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const initialValues = {
    plateNo: "",
    color: "",
    make: "",
    model: "",
  };

  const validationSchema = Yup.object({});
  return (
    <>
      <div className="w-full  h-[48px]">
        <div className="w-[30%]">
          <Searchbar placeholder="Search for Vehicles" />
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
            Add New Vehicle
          </button>
        </div>
      </div>
      <div className="overflow-y-auto mt-4">
        <table className="table-auto w-[100%]">
          <thead className="">
            <tr className=" ">
              <th className="text-sm font-semibold tracking-wide text-left w-[400px] pt-2 pb-2 ">
                Plate No
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Make
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Model
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
              data.map((vehicle) => (
                <tr className="">
                  <td
                    className="cursor-pointer"
                    onClick={() => {
                      setInfoId(vehicle.id as string);
                      setInfo(true);
                    }}
                  >
                    <span className="w-[50px] rounded-[2rem] ps-2 h-[50px] "></span>{" "}
                    {vehicle.plateNo}
                  </td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>
                    <span
                      className={
                        vehicle.status === "Active"
                          ? "bg-green-200 ps-2 pe-2 pt-1 pb-1 rounded-lg text-[green]"
                          : vehicle.status === "Inactive"
                          ? "bg-[#ffffcc] ps-2 pe-2 pt-1 pb-1 rounded-lg text-[#e6e600]"
                          : "bg-[#ffe6e6] ps-2 pe-2 pt-1 pb-1 rounded-lg text-[#e60000]"
                      }
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="flex space-x-2">
                    <div
                      onClick={() => {
                        setEdit(true);
                        setEditId(vehicle.id as string);
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
                    <div
                      onClick={() => {
                        setDeletee(true);
                        setId(vehicle.id as string);
                      }}
                      className="cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="red"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
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
              <span className="text-[2rem]">Add a vehicle</span>
            </div>
            <Formik
              innerRef={form1Ref}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const result = await createVehicle({
                    ...values,
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
                    <div className="h-[3rem] mb-2">
                      <Input
                        name="plateNo"
                        label="Plate Number"
                        style={{ border: "1px solid grey", outline: "none " }}
                      />
                    </div>
                    <div className="h-[3rem] mb-2">
                      <Input
                        name="color"
                        label="Color"
                        style={{ border: "1px solid grey", outline: "none " }}
                      />
                    </div>
                    <div className="h-[3rem] flex gap-x-2 mb-2 w-full">
                      <div className="flex-1 ">
                        <Input
                          name="make"
                          label="Make"
                          style={{ border: "1px solid grey", outline: "none " }}
                        />
                      </div>

                      <div className="flex-1">
                        {" "}
                        <Input
                          name="model"
                          label="Model"
                          style={{ border: "1px solid grey", outline: "none " }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
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
      {deletee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">Delete this vehicle</span>
            </div>
            <div>
              <span>Are you sure you want to delete this vehicle</span>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setDeletee(false);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const response = await deleteVehicle({ id }).unwrap();
                  if (response) {
                    toast.success(response.message);
                    setDeletee(false);
                  }
                }}
                type="button"
                className="bg-[#BF0A30]  text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {info && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">Vehicle Info</span>
            </div>
            <div className="flex md:flex-row sm:flex-col ">
              <div className="flex flex-1 flex-col">
                <span>Plate Number</span>
                <span>{vehicleInfo?.plateNo}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Status</span>
                <span
                  className={
                    vehicleInfo?.status === "Active"
                      ? "bg-green-200 p-[0.1rem] ps-2 w-[22%] rounded-lg text-[green]"
                      : ""
                  }
                >
                  {vehicleInfo?.status}
                </span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-4">
              <div className="flex flex-1 flex-col">
                <span>Make</span>
                <span className="">{vehicleInfo?.make}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Model</span>
                <span>{vehicleInfo?.model}</span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-3 ">
              <div className="flex flex-1 flex-col">
                <span>Driver Name</span>
                <span>
                  {vehicleInfo?.driver?.name
                    ? vehicleInfo?.driver?.name
                    : "None"}
                </span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Email</span>
                <span>
                  {vehicleInfo?.driver?.email
                    ? vehicleInfo?.driver?.email
                    : "None"}
                </span>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col mt-3 ">
              <div className="flex flex-1 flex-col">
                <span>Phone Number</span>
                <span>
                  {vehicleInfo?.driver?.phoneNo
                    ? vehicleInfo?.driver?.phoneNo
                    : "None"}
                </span>
              </div>
              <div className="flex flex-1 flex-col">
                <span>Driver Status</span>
                <span
                  className={
                    vehicleInfo?.driver?.status === "Active"
                      ? "bg-green-200 p-[0.1rem] ps-2 w-[22%] rounded-lg text-[green]"
                      : ""
                  }
                >
                  {vehicleInfo?.driver?.status
                    ? vehicleInfo?.driver?.status
                    : "None"}
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
      {edit && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50  flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] h-[30rem] rounded shadow-lg">
            {existingInfo ? (
              <>
                {console.log("form", existingInfo)}
                <div className="mb-4 border-b ">
                  <span className="text-[2rem]">Edit Driver</span>
                </div>
                <Formik
                  initialValues={{
                    plateNo: existingInfo.plateNo,
                    make: existingInfo.make,
                    model: existingInfo.model,
                    status: existingInfo.status,
                  }}
                  validationSchema={validationSchema}
                  innerRef={form2Ref}
                  onSubmit={async (values) => {
                    try {
                      const result = await updateVehicle({
                        id: editId,
                        plateNo: values.plateNo,
                        make: values.make,
                        model: values.model,
                        status: values.status,
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
                        {/* <div
                      className={
                        preview
                          ? "h-[9rem] mb-3 flex justify-center"
                          : "h-[3rem] mb-1 flex justify-center "
                      }
                    >
                      <div className="flex flex-col items-center">
                        {preview && (
                          <img
                            src={preview as string}
                            alt="Profile Preview"
                            className="mt-2 mb-2 h-20 w-20 rounded-[5rem] object-cover"
                          />
                        )}
                        <input
                          hidden
                          ref={fileRef}
                          name="profilePhoto"
                          type="file"
                          accept=".jpg,.png"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0] as File;
                            console.log(file);
                            handleFileChange(file);
                            formikProps.setFieldValue("profilePhoto", file);
                            console.log(formikProps.values);
                          }}
                        />
                        <button
                          type="button"
                          className="bg-neutral-200 shadow rounded p-2 pe-3 flex"
                          onClick={() => {
                            if (fileRef.current) {
                              fileRef.current.click();
                            }
                          }}
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
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                            />
                          </svg>

                          <span> Upload</span>
                        </button>
                      </div>
                    </div> */}
                        <div className="h-[4rem] mb-4">
                          <Input
                            name="plateNo"
                            value={formikProps.values.plateNo}
                            label="Plate Number"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                          />
                        </div>
                        <div className="h-[4rem] mb-4">
                          <Input
                            name="make"
                            label="Make"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                          />
                        </div>
                        <div className="h-[4rem] mb-4">
                          <Input
                            name="model"
                            label="Model"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                          />
                          <div className="mb-2 mt-3">
                            <span className="ps-2">Status</span>
                          </div>
                          <div className="h-[2.5rem] mb-5">
                            <Select
                              special={true}
                              name="status"
                              style={{
                                outline: "none",
                                border: "1px solid grey",
                              }}
                              roles={[
                                { option: "Active", value: "Active" },
                                { option: "Inactive", value: "Inactive" },
                                {
                                  option: "Out of Service",
                                  value: "Out of Service",
                                },
                              ]}
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

export default VehicleComponent;
