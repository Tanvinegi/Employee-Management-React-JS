import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import profilelogo from "../../images/profilelogo.svg.png";
import "./common.css";

function NotificationD() {
  const params = useParams();
  const [notification, setnotification] = useState([]);
  const getNotification = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/getNotification/" + params.notificationId
      );
      setnotification(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/notification">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Notification Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>{notification.Title}</td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td>
                    {notification.image ? (
                      <img
                        width={150}
                        height={100}
                        style={{ objectFit: "cover", border: "1px solid" }}
                        src={`http://localhost:3002/${notification.image}`}
                        alt=""
                      />
                    ) : (
                      <img
                        width={150}
                        height={100}
                        style={{ objectFit: "cover", border: "1px solid" }}
                        src={profilelogo}
                        alt=""
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Message</td>
                  <td>{notification.message}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{notification.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default NotificationD;
