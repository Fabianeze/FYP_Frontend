import DonutChart from "../../../../Common/barChart";
import { useGetDriverCountQuery } from "../../../../redux/api/slices/driver-api-slice";

const DriverChart = () => {
  const { data: driverCount } = useGetDriverCountQuery(null);
  console.log(driverCount)
  const data = {
    labels: ["Active", "Inactive"],
    series: [driverCount?.active || 0, driverCount?.inactive || 0],
  };
  const donutColors = ["#470A34", "#7CB9E8"];
  const labelColors = ["black", "black"];
  return (
    <>
      <div className="w-full h-[90%] flex justify-center ">
        <DonutChart
          data={data}
          donutColors={donutColors}
          labelColors={labelColors}
        />
      </div>
    </>
  );
};

export default DriverChart;
