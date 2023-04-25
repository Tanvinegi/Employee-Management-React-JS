import React from "react";
import SideBar from "../components/Sidebar/SideBar";

const Comment = () => {
  return (
    <>
      <SideBar />

      <div
        className="container-fluid"
        style={{ padding: "40px", marginLeft: "235px" }}
      >
        {/* <CalendarComponent height="500px"></CalendarComponent> */}
        <h1>Comment</h1>
      </div>
    </>
  );
};

export default Comment;
