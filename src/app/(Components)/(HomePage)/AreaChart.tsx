import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import { useTheme } from "@mui/material/styles";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = Array.from(Array(10).keys());

export default function AreaChart(options) {
  const theme = useTheme();
  const data = {
    labels,
    datasets: [
      {
        fill: {
          value: 400,
          below: "rgb(255, 0, 0)", // Area will be red above the origin
          above: "rgb(0, 255, 0)", // And blue below the origin
        },
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        pointBorderWidth: 0,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
