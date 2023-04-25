import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./Addadmin.css";
import Validate from "../components/Validate";
import useForm from "../components/useForm";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { values, formErrors } = useForm(Validate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [checkbox, setCheckbox] = useState([]);
  const [dashBoardPermission, setdashBoardPermission] = useState(false);
  const [userManagementPermission, setuserManagementPermission] =
    useState(false);
  const [NotificationPermission, setNotificationPermission] = useState(false);
  const [reportPermission, setreportPermission] = useState(false);
  const [AdminPermission, setAdminPermission] = useState(false);
  const [systemConfigPermission, setsystemConfigPermission] = useState(false);
  const [role, setRole] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  async function signup() {
    console.log(name, email, role);
    let item = {
      name,
      email,
      role,
      dashBoardPermission,
      userManagementPermission,
      systemConfigPermission,
      NotificationPermission,
      reportPermission,
      AdminPermission,
    };
    console.log(item);
    if (!name || !email || !role) {
      return toast.error("Please Fill out all the Fields");
    }
    let result = await fetch("http://localhost:3002/admin/addAdmin", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    if (result.statusCode === 400) {
      toast.error(result.message);
    } else if (result.data.status === "failed") {
      toast.error(result.data.message);
    } else if (result.data.status === "success") {
      toast.success(result.data.message);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    }
  }
  console.log(name, email, role);

  return (
    <>
      <SideBar />
      <div className="container">
        <Container style={{ width: "85%", marginLeft: "180px" }}>
          <div className="admin-main">
            <div>
              <Link to="/backtoadmin">
                <AiOutlineLeft fa-lg />
              </Link>
              Add admin
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="text"
                  placeholder="Enter First Name"
                />
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.name}
                </p>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.email}
                </p>
              </Form.Group>
              <Form.Label>Admin Type</Form.Label>
              <Form.Select
                id="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Super-Admin</option>
                <option>Sub-Admin</option>
              </Form.Select>
              <Form.Group>
                <Form.Check
                  inline
                  label="Dashboard"
                  name="dashBoardPermission"
                  value={dashBoardPermission}
                  onChange={(e) => setdashBoardPermission(e.target.checked)}
                />
                <Form.Check
                  inline
                  label="User Management"
                  name="userManagementPermission"
                  value={userManagementPermission}
                  onChange={(e) =>
                    setuserManagementPermission(e.target.checked)
                  }
                />
                <Form.Check
                  inline
                  label="Notification"
                  name="NotificationPermission"
                  value={NotificationPermission}
                  // defaultChecked={
                  //   checkbox.NotificationPermission === 1 ? true : false
                  // }
                  onChange={(e) => setNotificationPermission(e.target.checked)}
                />
                <Form.Check
                  inline
                  label="Report"
                  name="reportPermission"
                  value={reportPermission}
                  // defaultChecked={
                  //   checkbox.reportPermission === 1 ? true : false
                  // }
                  onChange={(e) => setreportPermission(e.target.checked)}
                />
                <Form.Check
                  inline
                  label="Admin"
                  name="AdminPermission"
                  value={AdminPermission}
                  // defaultChecked={checkbox.AdminPermission === 1 ? true : false}
                  onChange={(e) => setAdminPermission(e.target.checked)}
                />
                <Form.Check
                  inline
                  label="System Configuration"
                  name="systemConfigPermission"
                  value={systemConfigPermission}
                  onChange={(e) => setsystemConfigPermission(e.target.checked)}
                />
              </Form.Group>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
                type="submit"
                onClick={signup}
              >
                Save
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
