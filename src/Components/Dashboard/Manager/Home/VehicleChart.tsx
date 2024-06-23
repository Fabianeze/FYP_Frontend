import DonutChart from "../../../../Common/barChart";
import { useGetVehicleCountQuery } from "../../../../redux/api/slices/vehicle-api-slice";

const VehicleChart = () => {
  const { data: vehicleCount } = useGetVehicleCountQuery(null);
  const data = {
    labels: ["Active", "Inactive", "Out of Service"],
    series: [
      vehicleCount?.active || 0,
      vehicleCount?.inactive || 0,
      vehicleCount?.outofservice || 0,
    ],
  };
  const donutColors = ["#470A34", "#7CB9E8", "#fd5c63"];
  const labelColors = ["black", "black", "black"];
  return (
    <>
      <div className="w-full h-[70%] flex justify-center ">
        <DonutChart
          data={data}
          donutColors={donutColors}
          labelColors={labelColors}
        />
      </div>
    </>
  );
};

export default VehicleChart;
