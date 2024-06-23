import Chart from "react-apexcharts";

interface IDonutChart {
  data: { labels: string[]; series: number[] };
  donutColors: string[];
  labelColors: string[];
}
const DonutChart = ({ data, donutColors, labelColors }: IDonutChart) => {
  return (
    <>
      <Chart
        options={{
          labels: data.labels,
          colors: donutColors,
          legend: {
            position: "bottom",
            fontSize: "18px",
            itemMargin: { horizontal: 25 },
            labels: { colors: labelColors },
          },
          plotOptions: {
            pie: {
              customScale: 0.8,
              donut: {
                size: "45%",
              },
            },
          },
        }}
        series={data.series}
        type="donut"
        width={450}
      />
    </>
  );
};

export default DonutChart;
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   plugins,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// ChartJS.register(ArcElement, Tooltip, Legend);

// const BarChart = () => {
//   const data = {
//     labels: ["Active", "Inactive", "Out of Service"],
//     datasets: [
//       {
//         data: [3, 6, 10],
//         backgroundColor: ["#470A34", "#7CB9E8", "#fd5c63"],
//         borderColor: ["#470A34", "#7CB9E8", "#fd5c63"],
//       },
//     ],
//     hoverOffset: 4,
//   };

//   const options = {
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };
//   return (
//     <>
//       <Doughnut
//         data={data}
//         options={{ plugins: { legend: { position: "bottom"}}, }}
//       ></Doughnut>
//     </>
//   );
// };

// export default BarChart;
