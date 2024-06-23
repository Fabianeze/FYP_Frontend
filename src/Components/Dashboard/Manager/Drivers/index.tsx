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

const DriverComponent = () => {
  const form1Ref = useRef(null);
  const form2Ref = useRef(null);
  const [show, setShow] = useState(false);
  const [deletee, setDeletee] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [info, setInfo] = useState(false);
  const [infoId, setInfoId] = useState("");
  const [id, setId] = useState("");
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [createDriver] = useCreateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();
  const { data: driverInfo } = useGetDriverByIDQuery(
    { id: infoId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );
  const { data: existingInfo } = useGetDriverByIDQuery(
    { id: editId },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );
  console.log(existingInfo);
  const { data } = useGetDriversQuery(null);
  const { data: vehicles } = useGetVehiclesQuery(null);

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
    setPreview(null);
  };

  const vehicleOptions = vehicles?.map((vehicle) => ({
    option: vehicle.plateNo as string,
    value: vehicle.id as string,
  }));

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    phoneNo: "",
    profilePhoto: null,
    vehicle: "",
  };
  const initialValuesForm2 = {
    name: existingInfo ? existingInfo.name : "",
    email: existingInfo?.email || "",
    phoneNo: existingInfo?.phoneNo || "",
    status: existingInfo?.status || "",
    profilePhoto: null,
    vehicle: existingInfo?.vehicle?.id || "",
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

  useEffect(() => {
    console.log(editId);
  }, [editId]);
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
            Add New Driver
          </button>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto mt-4">
        <table className="table-auto w-[100%]">
          <thead className="">
            <tr className=" ">
              <th className="text-sm font-semibold tracking-wide text-left w-[400px] pt-2 pb-2 ">
                Name
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Phone
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
              data.map((driver) => (
                <tr>
                  <td
                    className="cursor-pointer"
                    onClick={() => {
                      setInfoId(driver.id as string);
                      setInfo(true);
                      console.log("exisiting", existingInfo);
                    }}
                  >
                    <span className="w-[50px] rounded-[2rem] h-[50px] ps-3"></span>{" "}
                    {driver.name}
                  </td>
                  <td>{driver.email}</td>
                  <td>{driver.phoneNo}</td>
                  <td>
                    <span
                      className={
                        driver.status === "Active"
                          ? "bg-green-200 p-2 rounded-lg text-[green]"
                          : "bg-[#ffffcc] p-2 rounded-lg text-[#e6e600]"
                      }
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="flex space-x-2">
                    <div
                      onClick={() => {
                        setEdit(true);
                        setEditId(driver.id as string);
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
                        setId(driver.id as string);
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
              <span className="text-[2rem]">Add a driver</span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              innerRef={form1Ref}
              onSubmit={async (values) => {
                try {
                  const result = await createDriver({
                    email: values.email,
                    name: values.name,
                    phoneNo: values.phoneNo,
                    profilePhoto: values.profilePhoto
                      ? values.profilePhoto
                      : "",
                    vehicleId: values.vehicle,
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
                        name="name"
                        label="Name"
                        style={{ border: "1px solid grey", outline: "none " }}
                      />
                    </div>
                    <div className="h-[4rem] mb-4">
                      <Input
                        name="email"
                        label="Email"
                        style={{ border: "1px solid grey", outline: "none " }}
                      />
                    </div>
                    <div className="h-[4rem] mb-4">
                      <Input
                        name="phoneNo"
                        label="Phone Number"
                        style={{ border: "1px solid grey", outline: "none " }}
                      />
                    </div>
                    <div className="mb-2">
                      <span>Assign a vehicle</span>
                    </div>
                    <div className="h-[2.5rem] mb-5">
                      <Select
                        special={true}
                        name="vehicle"
                        style={{
                          outline: "none",
                          border: "1px solid grey",
                        }}
                        roles={
                          vehicleOptions
                            ? [
                                { option: "-----", value: "" },
                                ...vehicleOptions,
                              ]
                            : [{ option: "", value: "" }]
                        }
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
      {deletee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[40%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">Delete this driver</span>
            </div>
            <div>
              <span>Are you sure you want to delete this driver</span>
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
                  const response = await deleteDriver({ id }).unwrap();
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
                    name: existingInfo.name,
                    email: existingInfo.email,
                    phoneNo: existingInfo.phoneNo,
                    status: existingInfo.status,
                    profilePhoto: null,
                    vehicle: existingInfo.vehicle?.id,
                  }}
                  validationSchema={validationSchema}
                  innerRef={form2Ref}
                  onSubmit={async (values) => {
                    try {
                      const result = await updateDriver({
                        id: editId,
                        email: values.email,
                        name: values.name,
                        phoneNo: values.phoneNo,
                        profilePhoto: values.profilePhoto
                          ? values.profilePhoto
                          : "",
                        vehicleId: values.vehicle,
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
                            name="name"
                            value={formikProps.values.name}
                            label="Name"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                          />
                        </div>
                        <div className="h-[4rem] mb-4">
                          <Input
                            name="email"
                            label="Email"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                          />
                        </div>
                        <div className="h-[4rem] mb-4">
                          <Input
                            name="phoneNo"
                            label="Phone Number"
                            style={{
                              border: "1px solid grey",
                              outline: "none ",
                            }}
                          />
                          <div className="mb-2 mt-2">
                            <span>Status</span>
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
                              ]}
                            />
                          </div>
                          <div className="mb-2">
                            <span>Assign a vehicle</span>
                          </div>
                          <div className="h-[2.5rem] mb-5">
                            <Select
                              special={true}
                              name="vehicle"
                              style={{
                                outline: "none",
                                border: "1px solid grey",
                              }}
                              roles={
                                vehicleOptions
                                  ? [
                                      { option: "-----", value: "" },
                                      ...vehicleOptions,
                                    ]
                                  : [{ option: "", value: "" }]
                              }
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

export default DriverComponent;
