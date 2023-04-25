import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "antd";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

function ChartAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/admin/getAllDetails"
      );
      setAdminData(response.data.data);
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
        data: [
          adminData.BugPendng,
          adminData.BugApproved,
          adminData.BugDeclined,
          adminData.BugTotal,
        ],
        backgroundColor: ["#8e44ad", "#f1c40f", "yellow", "green"],
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
      <Doughnut
        data={Donutdata}
        onClick={() => navigate("/reports/reportbug")}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Pending {adminData.BugPendng}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Approved {adminData.BugApproved}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Declined {adminData.BugDeclined}
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
          Reported Bugs {adminData.BugTotal}
        </Typography>
      </div>
    </>
  );
}

export default ChartAdmin;
