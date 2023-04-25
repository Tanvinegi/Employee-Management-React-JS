import React from "react";
import ChartContainer from "../../pages/ChartContainer";
import SideBar from "../Sidebar/SideBar";
import ReportCharts from "./ReportCharts";
import DashboardApp from "../Table/DahboardAppV";
const Mainchart = () => {
  return (
    <>
      <SideBar />

      <div
        className="container"
        style={{
          marginLeft: "235px",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        <div className="row">
          <ChartContainer />
          {/* <div className="col" style={{ marginLeft: "-150px" }}>
            <DashboardApp />
          </div>
          <div className="col d-md-flex" style={{ marginLeft: "200px" }}>
            <ReportCharts />
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Mainchart;
