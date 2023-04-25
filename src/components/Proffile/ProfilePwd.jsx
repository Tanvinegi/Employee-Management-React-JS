import React from "react";
import { Tabs, Tab, AppBar, makeStyles } from "@material-ui/core";
import "./ProfilePwd.css";
import ChangePassword from "./ChangePassword";
import "../../pages/Addadmin.css";
import Profile from "./Profile";
import SideBar from "../Sidebar/SideBar";
const useStyles = makeStyles({
  top: {
    backgroundColor: "transparent",
    color: "black",
    boxShadow: "0px 0px, 0px 0px",
    width: "100%",
    position: "static",
  },
});

const ProfilePwd = () => {
  const classes = useStyles();
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
  }
  const [value, setValue] = React.useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };
  return (
    <>
      <SideBar />
      <div
        className="container"
        style={{
          boxShadow: "0px 0px, 0px 0px",
          alignItems: "center",
          marginLeft: "235px",
        }}
      >
        <AppBar className={classes.top}>
          <Tabs value={value} onChange={handleTabs}>
            <Tab label="Profile" />
            <Tab label="Change Password" />
          </Tabs>
        </AppBar>
        {/* <hr /> */}
        <TabPanel value={value} index={0}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChangePassword />
        </TabPanel>
      </div>
    </>
  );
};

export default ProfilePwd;
