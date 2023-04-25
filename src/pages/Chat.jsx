import React from "react";
import SideBar from "../components/Sidebar/SideBar";

const Chat = () => {
  return (
    <>
      <SideBar />

      <div
        className="container-fluid"
        style={{ padding: "40px", marginLeft: "235px" }}
      >
        {/* <CalendarComponent height="500px"></CalendarComponent> */}
        <h1>Chat</h1>
      </div>
    </>
  );
};

export default Chat;
