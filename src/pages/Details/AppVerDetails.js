import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import "./common.css";

function AppVerDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [appVersion, setAppVersion] = useState([]);
  const getApp = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/version/viewApp/" + params.appId
      );
      setAppVersion(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApp();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <AiOutlineLeft
                fa-lg
                color="black"
                onClick={() => navigate("/systemConfig/appversion")}
              />
              App Version Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{appVersion.appname}</td>
                </tr>
                <tr>
                  <td>Minimum Version</td>
                  <td>{appVersion.minimumVersion}</td>
                </tr>
                <tr>
                  <td>Version</td>
                  <td>{appVersion.latestVersion}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{appVersion.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default AppVerDetails;
