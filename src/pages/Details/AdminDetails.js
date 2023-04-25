import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import "./common.css";
import profilelogo from "../../images/profil-photo-icon.jpg";

function AdminDetails() {
  const params = useParams();
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/admin/viewParticularAdmin/" + params.uId
      );
      setAdmin(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/admin">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Admin Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{admin.name}</td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td>
                    {admin.image ? (
                      <img
                        width={150}
                        height={100}
                        style={{ objectFit: "cover", border: "1px solid" }}
                        src={`http://localhost:3002/${admin.image}`}
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
                  <td>Email</td>
                  <td>{admin.email}</td>
                </tr>
                <tr>
                  <td>Admin Type</td>
                  <td>{admin.role}</td>
                </tr>
                <tr>
                  <td>Access</td>
                  <td>
                    <div>
                      {admin.dashBoardPermission == "1" ? (
                        <span className="badge bg-secondary access1">
                          Dashboard
                        </span>
                      ) : (
                        <span className="badge bg-secondary access1"></span>
                      )}
                      {admin.userManagementPermission == "1" ? (
                        <span className="badge bg-primary access1">User</span>
                      ) : (
                        <span className="badge bg-primary access1"></span>
                      )}
                      {admin.AdminPermission == "1" ? (
                        <span className="badge bg-primary access1">Admin</span>
                      ) : (
                        <span className="badge bg-primary access1"></span>
                      )}
                      {admin.NotificationPermission == "1" ? (
                        <span className="badge bg-primary access1">
                          Notification
                        </span>
                      ) : (
                        <span className="badge bg-primary access1"></span>
                      )}
                      {admin.systemConfigPermission == "1" ? (
                        <span className="badge bg-primary access1">
                          SystemConfig
                        </span>
                      ) : (
                        <span className="badge bg-primary access1"></span>
                      )}
                      {admin.reportPermission == "1" ? (
                        <span className="badge bg-primary access1">Report</span>
                      ) : (
                        <span className="badge bg-primary access1"></span>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{admin.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default AdminDetails;
