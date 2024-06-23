import { useState } from "react";
import Searchbar from "../../../../Common/searchbar";
import {
  useGetAllTripsForDriverQuery,
  useGetNewTripsForDriverQuery,
  useUpdateTripMutation,
} from "../../../../redux/api/slices/trip-api-slice";
import { toast } from "react-toastify";
import { getDate } from "../../../../utils/getDate";

const DriverTripsComponent = () => {
  const [newTab, setNewTab] = useState(true);
  const { data: newTrips } = useGetNewTripsForDriverQuery(null);
  const [updateTrip] = useUpdateTripMutation();
  console.log(newTrips);
  const { data: history } = useGetAllTripsForDriverQuery(null);
  const handleShow = () => {
    setNewTab((prev) => !prev);
  };

  const updateStatus = async (status: string, id: string) => {
    try {
      const result = await updateTrip({
        id,
        status,
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
  const updateEndTIme = async (endTime: string, id: string, status: string) => {
    try {
      const result = await updateTrip({
        id,
        endTime,
        status,
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
  const updateStartTime = async (
    startTime: string,
    id: string,
    status: string
  ) => {
    try {
      const result = await updateTrip({
        id,
        startTime,
        status,
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

  // const handleHide = () => {
  //   setShow(false);
  // };
  return (
    <>
      <>
        <div className="flex space-x-5 mb-3">
          <div
            onClick={handleShow}
            className={
              newTab
                ? "bg-[#470A34] cursor-pointer p-3 rounded-lg"
                : "bg-neutral-50 cursor-pointer p-3 rounded-lg"
            }
          >
            <span className={newTab ? "text-[#FFFFFF]" : ""}>New trip</span>
          </div>
          <div
            onClick={handleShow}
            className={
              !newTab
                ? "bg-[#470A34] cursor-pointer p-2 pt-3 pe-3 rounded-lg"
                : "bg-neutral-50 cursor-pointer p-2 pt-3 pe-3 rounded-lg"
            }
          >
            <span className={!newTab ? "text-[#FFFFFF]" : ""}>History</span>
          </div>
        </div>
        {newTab ? (
          <>
            <div className="w-full  h-[48px]">
              <div className="w-[30%]">
                <Searchbar placeholder="Search for Triiips" />
              </div>
            </div>
            <div className="bg-neutral-50 rounded-[20px] h-[6rem] items-center ps-5 pe-5 mt-5 flex justify-between">
              <div>
                <span>Sort By</span>
              </div>
            </div>
            <div className="overflow-y-auto  ps-3 mt-4">
              <table className="table-auto w-[100%]">
                <thead className="">
                  <tr className=" ">
                    <th className="text-sm font-semibold tracking-wide text-left  pt-2 pb-2 ">
                      ID
                    </th>
                    <th className="text-sm font-semibold tracking-wide text-left w-[300px]">
                      Guest Name
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {newTrips &&
                    newTrips.map((trip) => (
                      <tr className="">
                        <td>
                          <span className="w-[50px] ps-2 rounded-[2rem] h-[50px] "></span>{" "}
                          {trip.tripId}
                        </td>
                        <td>{trip.guest?.name}</td>
                        <td>{trip.type}</td>
                        <td>{trip.from}</td>
                        <td>{trip.to}</td>
                        <td>
                          <div className="flex space-x-2">
                            <button
                              className="bg-green-200 p-2 rounded-lg text-[green]"
                              onClick={() =>
                                updateStatus("Not Started", trip.id as string)
                              }
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                updateStatus("Rejected", trip.id as string)
                              }
                              className="bg-[#ffb3b3] p-2 rounded-lg text-[#ff0000]"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="w-full  h-[48px]">
              <div className="w-[30%]">
                <Searchbar placeholder="Search for Trips" />
              </div>
            </div>
            <div className="bg-neutral-50 rounded-[20px] h-[6rem] items-center ps-5 pe-5 mt-5 flex justify-between">
              <div>
                <span>Sort By</span>
              </div>
            </div>
            <div className="overflow-y-auto  ps-3 mt-4">
              <table className="table-auto w-[100%]">
                <thead className="">
                  <tr className=" ">
                    <th className="text-sm font-semibold tracking-wide text-left  pt-2 pb-2 ">
                      ID
                    </th>
                    <th className="text-sm font-semibold tracking-wide text-left w-[200px]">
                      Guest Name
                    </th>
                    <th className="text-sm font-semibold tracking-wide text-left">
                      Status
                    </th>
                    <th className="text-sm font-semibold tracking-wide text-left">
                      From
                    </th>
                    <th className="text-sm font-semibold tracking-wide text-left">
                      To
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
                  {history &&
                    history.map((trip) => (
                      <tr className="">
                        <td>
                          <span className="w-[50px] ps-2 rounded-[2rem] h-[50px]"></span>{" "}
                          {trip.tripId}
                        </td>
                        <td>{trip.guest?.name}</td>
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
                        <td>{trip.from}</td>
                        <td>{trip.to}</td>
                        <td className="ps-5">
                          {trip.status === "Rejected" ? (
                            "----"
                          ) : trip.status === "Not Started" ? (
                            <>
                              <button
                                onClick={() => {
                                  const date = getDate();
                                  updateStartTime(
                                    date,
                                    trip.id as string,
                                    "On Going"
                                  );
                                }}
                                className="bg-[#470A34] p-1 rounded-lg text-[white]"
                              >
                                Start Trip
                              </button>
                            </>
                          ) : (
                            <>{trip.startTime}</>
                          )}
                        </td>
                        <td className="ps-5">
                          {trip.status === "Rejected" ||
                          trip.status === "Not Started" ? (
                            "----"
                          ) : trip.status === "On Going" ? (
                            <>
                              <button
                                onClick={() => {
                                  const date = new Date();
                                  const timesTamp = date.getTime();
                                  const correct = new Date(timesTamp);
                                  const month = correct.getDay();
                                  const year = correct.getFullYear();
                                  const day = correct.getDate();
                                  const time =
                                    correct.getHours().toString() +
                                    ":" +
                                    correct.getMinutes().toString();
                                  const realDate =
                                    year.toString() +
                                    "-" +
                                    month.toString() +
                                    "-" +
                                    day.toString() +
                                    " " +
                                    time;

                                  updateEndTIme(
                                    realDate,
                                    trip.id as string,
                                    "Completed"
                                  );
                                }}
                                className="bg-[#470A34] p-1 rounded-lg text-[white]"
                              >
                                End Trip
                              </button>
                            </>
                          ) : (
                            <>{trip.endTime}</>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default DriverTripsComponent;
