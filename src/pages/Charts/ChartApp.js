import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "antd";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

function ChartApp() {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/department/getDepartmentSalary"
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
        data: [
          Data.countBySalaryLevel1,
          Data.countBySalaryLevel2,
          Data.IOS,
          Data.countBySalaryLevel3,
        ],
        backgroundColor: ["red", "yellow", "orange", "#8926b3"],
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
      <Doughnut data={Donutdata} onClick={() => navigate("/department")} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Level-1 : {Data.countBySalaryLevel1}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Level-2 : {Data.countBySalaryLevel2}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Level-3 : {Data.countBySalaryLevel3}
        </Typography>
      </div>
      <hr />
    </>
  );
}

export default ChartApp;
