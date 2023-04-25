import React from "react";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Donutdata = {
  datasets: [
    {
      label: "# of Votes",
      data: [19, 2, 3],
      backgroundColor: ["red", "yellow", "orange"],
      // borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart() {
  return (
    <>
      <Doughnut data={Donutdata} />
      <Typography
        variant="text"
        color="initial"
        textAlign="center"
        sx={{ m: 1 }}
      >
        Pending 19
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Approved 2
        </Typography>
      </Typography>
      <Typography
        variant="text"
        color="initial"
        textAlign="center"
        sx={{ m: 2 }}
      >
        Declined 2
      </Typography>
    </>
  );
}

export default DoughnutChart;
