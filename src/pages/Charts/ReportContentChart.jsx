import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "antd";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
function ChartAdmin() {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/admin/getAllDetails"
      );
      console.log("This is graph data::", response.data.data);
      setAdminData(response.data.data);
      console.log("This is admin data-----", adminData);
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
          adminData.Pending,
          adminData.Approved,
          adminData.Declined,
          adminData.Report,
        ],
        backgroundColor: ["lightgreen", "yellow", "red", "blue"],
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
        onClick={() => navigate("/reports/reportContent")}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Pending {adminData.Pending}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Approved {adminData.Approved}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Declined {adminData.Declined}
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
          Reported Content {adminData.Report}
        </Typography>
      </div>
    </>
  );
}

export default ChartAdmin;
