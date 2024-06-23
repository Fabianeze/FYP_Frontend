import { LineChart } from "../../../../Common/lineChart";

const TripChart = () => {
  return (
    <>
      <div className="h-full bg-neutral-50 rounded-lg flex-1">
        <div className="ps-3">
          <span className="text-[22px]">Trips</span>
        </div>
        <div className="flex justify-center mt-5">
          <LineChart />
        </div>
      </div>
    </>
  );
};

export default TripChart;
