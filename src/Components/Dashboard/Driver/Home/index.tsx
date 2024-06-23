import { useGetDriverProfileQuery } from "../../../../redux/api/slices/driver-api-slice";
import MaintenaceChart from "./MaintenanceChart";
import TripChart from "./TripChart";

const DriverDashboardComponent = () => {
  const { data: driver } = useGetDriverProfileQuery(null);
  return (
    <>
      <div className="flex space-y-4 flex-col h-full">
        <div className="bg-[#470A34] flex flex-col h-[5rem] h-[20%] rounded-lg w-full">
          <div className="ps-4 pt-3 flex-1 ">
            <span className="text-[25px] text-[#FFFFFF] ">
              Welcome, {driver?.name}
            </span>
          </div>

          <div className="flex-1 flex justify-end ">
            <span className="text-[15px] text-[#FFFFFF] pe-5">
              Remember always drive carefully...
            </span>
          </div>
        </div>
        <div className=" flex space-x-2 h-[80%] w-full">
          <TripChart />
          <MaintenaceChart />
        </div>
      </div>
    </>
  );
};

export default DriverDashboardComponent;
