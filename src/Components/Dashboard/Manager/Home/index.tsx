import DriverChart from "./DriverChart";
import VehicleChart from "./VehicleChart";

const DashboardComponent = () => {
  return (
    <>
      <div className="flex space-x-4 h-full">
        <div className="flex-1 rounded-[2rem] h-[70%] ">
          <div className="mb-[2rem]">
            <span className="text-[20px]">Vehicles</span>
          </div>
          <div className="rounded-[2rem] h-[86.3%] bg-neutral-50">
            <VehicleChart />
          </div>
        </div>

        <div className="flex-1 rounded-[2rem] h-[70%] ">
          <div className="mb-[2rem]">
            <span className="text-[20px]">Drivers</span>
          </div>
          <div className="rounded-[2rem] h-[86.3%] bg-neutral-50">
            <DriverChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
