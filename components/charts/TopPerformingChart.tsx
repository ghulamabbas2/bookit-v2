import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Room {
  roomName: string;
  bookingsCount: number;
}

interface Props {
  rooms: Room[];
}

export function TopPerformingChart({ rooms }: Props) {
  const data = {
    labels: rooms?.map((room) => room?.roomName),
    datasets: [
      {
        label: "# of Bookings",
        data: rooms?.map((room) => room?.bookingsCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}
