import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Gauge() {
  return (
    <Doughnut
      data={{
        labels: ["green", "red"],
        datasets: [
          {
            label: "# of Votes",
            data: [3, 6],
            backgroundColor: ["green", "red"],
            borderColor: ["green", "red"],
            borderWidth: 1,
            circumference: 180,
            rotation: 270,
          },
        ],
      }}
    />
  );
}
