import DonutChart from "../../../../Common/barChart";
import { useGetMaintenanceCountQuery } from "../../../../redux/api/slices/maintenance-api-slice";

const MaintenaceChart = () => {
  const { data: maintenanceCount } = useGetMaintenanceCountQuery(null);
  console.log(maintenanceCount)
  const data = {
    labels: ["Approved", "Rejected", "Pending"],
    series: [
      maintenanceCount?.approvedCount || 0,
      maintenanceCount?.rejectedCount || 0,
      maintenanceCount?.pendingCount || 0,
    ],
  };
  const donutColors = ["#32de84", "#AA0000","#FFFF00"];
  const labelColors = ["black", "black","black"];
  return (
    <>
      <div className="h-full bg-neutral-50 rounded-lg flex-1">
        <div className="ps-3">
          <span className="text-[22px]">Maintenance</span>
        </div>
        <div className="flex justify-center">
          <DonutChart
            data={data}
            donutColors={donutColors}
            labelColors={labelColors}
          />
        </div>
      </div>
    </>
  );
};

export default MaintenaceChart;
