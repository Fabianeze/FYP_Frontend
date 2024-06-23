import { useRef, useState } from "react";
import Searchbar from "../../../../Common/searchbar";
import { Form, Formik } from "formik";
import { Input } from "../../../../Common/input";
import * as Yup from "yup";
import {
  Driver,
  useGetAvailableDriversQuery,
  useGetDriverByIDQuery,
  useGetDriversQuery,
} from "../../../../redux/api/slices/driver-api-slice";
import { Select } from "../../../../Common/select";
import { useGetVehiclesQuery } from "../../../../redux/api/slices/vehicle-api-slice";
import {
  useCreateTripMutation,
  useGetTripsForGuestQuery,
  useGetTripsQuery,
} from "../../../../redux/api/slices/trip-api-slice";
import { ToastContainer, toast } from "react-toastify";

const GuestTripsComponent = () => {
  const [show, setShow] = useState(false);
  // const [driver, setDriver] = useState<Driver | null>(null);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [createTrip] = useCreateTripMutation();
  const { data } = useGetTripsForGuestQuery(null);
  const { data: availableDrivers } = useGetAvailableDriversQuery(null);
  const { data: driver } = useGetDriverByIDQuery(
    { id: selectedDriver },
    { refetchOnMountOrArgChange: true }
  );
  console.log(driver);
  console.log(data);

  const driverOptions = availableDrivers?.map((drivers) => ({
    option: drivers.name as string,
    value: drivers.id as string,
  }));

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const initialValues = {
    type: "",
    driver: "",
    from: "",
    to: "",
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
          <Searchbar placeholder="Search for Trips" />
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
            Book a trip
          </button>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto mt-4">
        <table className="table-auto w-[100%]">
          <thead className="">
            <tr className=" ">
              <th className="text-sm font-semibold tracking-wide text-left w-[200px] pt-2 pb-2 ">
                ID
              </th>
              <th className="text-sm font-semibold tracking-wide w-[300px] text-left">
                Driver
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Vehicle
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Type
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                From
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                To
              </th>
              <th className="text-sm font-semibold tracking-wide text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data &&
              data.map((trip) => (
                <tr className="">
                  <td>
                    <span className="w-[50px] rounded-[2rem] h-[50px] bg-red-200"></span>{" "}
                    {trip.tripId}
                  </td>
                  <td>{trip.driver?.name}</td>
                  <td>{trip.vehicle?.plateNo}</td>
                  <td>{trip.type}</td>
                  <td>{trip.from}</td>
                  <td>{trip.to}</td>
                  <td>
                    <span
                      className={
                        trip.status === "Accepted"
                          ? "bg-green-200 p-2 rounded-lg text-[green]"
                          : trip.status === "Rejected"
                          ? "bg-[#ffb3b3] p-2 rounded-lg text-[#ff0000]"
                          : "bg-[#ffffcc] p-2 rounded-lg text-[#e6e600]"
                      }
                    >
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-[0.6rem] p-6 w-[55%] rounded shadow-lg">
            <div className="mb-4 border-b ">
              <span className="text-[2rem]">Book a Trip</span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const result = await createTrip({
                    type: values.type,
                    driverId: values.driver,
                    from: values.from,
                    to: values.to,
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
                    <div className="flex md:flex-row sm:flex-col md:space-x-[4rem] ">
                      <div className="flex flex-1 flex-col">
                        <span>Driver</span>
                        <div className="h-[2.5rem] mt-2 mb-5">
                          <Select
                            special={true}
                            name="driver"
                            style={{
                              outline: "none",
                              border: "1px solid grey",
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              formikProps.setFieldValue("driver", value);
                              setSelectedDriver(value); // Update state on change
                              console.log("hello");
                            }}
                            roles={
                              driverOptions
                                ? [
                                    { option: "-----", value: "" },
                                    ...driverOptions,
                                  ]
                                : [{ option: "", value: "" }]
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 justify-between ">
                        <div>
                          <span>Plate No</span>
                          <span></span>
                        </div>
                        <div>
                          <span>Make</span>
                          <span></span>
                        </div>
                        <div>
                          <span>Model</span>
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-row sm:flex-col md:space-x-[4rem] ">
                      <div className="flex flex-1 flex-col">
                        <span>Type</span>
                        <div className="h-[2.5rem] mt-2 mb-5">
                          <Select
                            special={true}
                            name="type"
                            style={{
                              outline: "none",
                              border: "1px solid grey",
                            }}
                            roles={[
                              {
                                option: "---",
                                value: "",
                              },
                              { option: "Within CU", value: "Within CU" },
                              { option: "Outside CU", value: "Outside CU" },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 space-x-[1rem]">
                        <div className="flex-1 ">
                          <span>From</span>
                          <div className="h-[2.5rem] mt-2 mb-5">
                            <Select
                              special={true}
                              name="from"
                              style={{
                                outline: "none",
                                border: "1px solid grey",
                              }}
                              disabled={
                                formikProps.values.type === "" ? true : false
                              }
                              roles={[
                                {
                                  option: "---",
                                  value: "",
                                },
                                {
                                  option: "Senate Building",
                                  value: "Senate Building",
                                },
                                { option: "CUCRID", value: "CUCRID" },
                                { option: "Stadium", value: "Stadium" },
                                { option: "Chapel", value: "Chapel" },
                                { option: "CST", value: "CST" },
                                { option: "COE", value: "COE" },
                                { option: "Gate", value: "Gate" },
                              ]}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <span>To</span>
                          <div className="h-[2.5rem] mt-2 mb-5">
                            {formikProps.values.type === "Within CU" ? (
                              <Select
                                special={true}
                                name="to"
                                style={{
                                  outline: "none",
                                  border: "1px solid grey",
                                }}
                                roles={[
                                  {
                                    option: "---",
                                    value: "",
                                  },
                                  {
                                    option: "Senate Building",
                                    value: "Senate Building",
                                  },
                                  { option: "CUCRID", value: "CUCRID" },
                                  { option: "Stadium", value: "Stadium" },
                                  { option: "Chapel", value: "Chapel" },
                                  { option: "CST", value: "CST" },
                                  { option: "COE", value: "COE" },
                                  { option: "Gate", value: "Gate" },
                                ]}
                              />
                            ) : formikProps.values.type === "" ? (
                              <Select
                                special={true}
                                name="to"
                                style={{
                                  outline: "none",
                                  border: "1px solid grey",
                                }}
                                disabled={true}
                                roles={[
                                  {
                                    option: "---",
                                    value: "",
                                  },
                                  {
                                    option: "Senate Building",
                                    value: "Senate Building",
                                  },
                                  { option: "CUCRID", value: "CUCRID" },
                                  { option: "Stadium", value: "Stadium" },
                                  { option: "Chapel", value: "Chapel" },
                                  { option: "CST", value: "CST" },
                                  { option: "COE", value: "COE" },
                                  { option: "Gate", value: "Gate" },
                                ]}
                              />
                            ) : (
                              <Input
                                name="to"
                                style={{
                                  outline: "none",
                                  border: "1px solid grey",
                                  height: "100%",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
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
      <ToastContainer />
    </>
  );
};

export default GuestTripsComponent;
