import React, { useState, useEffect } from "react";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/education/getalltableRecord"
      );
      console.log("This is graph data::", response.data.data);
      setData(response.data.data);
      console.log("This is admin data-----", Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const Donutdata = {
    datasets: [
      {
        label: "# of Votes",
        data: [Data.BlockCount, Data.UnblockCount, Data.blockUnblockTotal],
        backgroundColor: ["#8e44ad", "#f1c40f", "#4a69bd"],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 162, 235)",
          "rgba(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut data={Donutdata} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          <span
            onClick={() => navigate("/viewBlockedEducation")}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            Blocked Salary {Data.BlockCount}
          </span>
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          <span
            onClick={() => navigate("/ViewUnBlockedEducation")}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            UnBlocked Salary {Data.UnblockCount}
          </span>
        </Typography>
      </div>
      <hr />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 2 }}
        >
          <span
            onClick={() => navigate("/education")}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            Total {Data.blockUnblockTotal}
          </span>
        </Typography>
      </div>
    </>
  );
}

export default DoughnutChart;
