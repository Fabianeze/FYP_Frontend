import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export const LineChart = () => {
  const series = [
    {
      name: "Trips",
      data: [10, 41, 35, 51, 49, 62, null, null, null],
    },
  ];

  const options: ApexOptions = {
    chart: {
      zoom: { enabled: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Trips by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  return (
    <>
      <Chart
        type="line"
        height={450}
        width={500}
        options={options}
        series={series}
      />
    </>
  );
};
