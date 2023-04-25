import React from "react";
import ChartDonut from "../components/Charts/DoughnutChart";
import "./chartcontainer.css";
import ChartAdmin from "./Charts/ChartAdmin";
import ChartApp from "./Charts/ChartApp";

export default function ChartContainer() {
  return (
    <>
      <div className="dashboard-css">
        <div>
          <ChartAdmin />
        </div>
        <div className="dashboard">
          <ChartApp />
        </div>
        <div className="dashboard-donut">
          <ChartDonut />
        </div>
      </div>
    </>
  );
}
