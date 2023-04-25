import React from "react";
import "../../pages/chartcontainer.css";
import ReportContentChart from "../../pages/Charts/ReportContentChart";
import ReportBug from "../../pages/Charts/ReportBug";

export default function ReportCharts() {
  return (
    <>
      <div className="dashboard-css">
        <div>
          <ReportContentChart />
        </div>
        <div className="dashboard">
          <ReportBug />
        </div>
      </div>
    </>
  );
}
