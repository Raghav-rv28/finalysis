// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { useTheme } from "@mui/material/styles";
// import chartData from "../../app/api/data/chartdata.json";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

// export default function AreaChart({ index }: { index: string }) {
//   const theme = useTheme();
//   console.log(
//     chartData.values.map((value: { open: string }) => Number(value.open))
//   );
//   const data = {
//     labels: chartData.values.map(
//       (value: { datetime: string }) =>
//         `${value.datetime.split(" ")[1].split(":")[0]}:${
//           value.datetime.split(" ")[1].split(":")[1]
//         }`
//     ),
//     datasets: [
//       {
//         fill: {
//           value: Number(chartData.values[0].open),
//           below: "rgb(255, 0, 0)", // Area will be red above the origin
//           above: "rgb(0, 255, 0)", // And blue below the origin
//         },
//         label: index,
//         data: chartData.values.map((value: { open: string }) =>
//           Number(value.open)
//         ),
//         borderColor: theme.palette.primary.main,
//         borderWidth: 1,
//         pointBorderWidth: 0,
//       },
//     ],
//   };
//   return (
//     <Line
//       options={{
//         responsive: true,
//         animation: false,
//         scales: {
//           y: {
//             min:
//               Math.min(
//                 ...chartData.values.map((value: { high: string }) =>
//                   Number(value.high)
//                 )
//               ) - 2,
//             max:
//               Math.max(
//                 ...chartData.values.map((value: { low: string }) =>
//                   Number(value.low)
//                 )
//               ) + 2,
//           },
//         },
//         plugins: {
//           legend: {
//             rtl: true,
//             labels: {
//               font: {
//                 size: 14,
//               },
//             },
//           },
//         },
//       }}
//       data={data}
//     />
//   );
// }

// USELESS FOR NOW
