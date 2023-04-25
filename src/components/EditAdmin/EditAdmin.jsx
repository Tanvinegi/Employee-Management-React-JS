import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "../../pages/Addadmin.css";
import Validate from "../Validate";
import useForm from "../useForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import axios from "axios";
const EditAdmin = () => {
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState([]);
  const [dashBoardPermission, setdashBoardPermission] = useState(false);
  const [userManagementPermission, setuserManagementPermission] =
    useState(false);
  const [NotificationPermission, setNotificationPermission] = useState(false);
  const [reportPermission, setreportPermission] = useState(false);
  const [AdminPermission, setAdminPermission] = useState(false);
  const [systemConfigPermission, setsystemConfigPermission] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", name, role);
  }
  function handleSelect(e) {
    setRole(e.target.value);
  }

  // const params = useParams();
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

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/admin/List?limit=100&skip=0"
      );
      console.log(response.data.data.rows);
      setUser(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function save() {
    let item = {
      name,
      role,
      dashBoardPermission,
      userManagementPermission,
      systemConfigPermission,
      NotificationPermission,
      reportPermission,
      AdminPermission,
    };
    console.log("edit", item);
    await fetch("http://localhost:3002/admin/edit/" + params.uId, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        console.log("This is resq ", resq);
        if (resq.statusCode === 400) {
          toast.error(resq.message, { position: toast.POSITION.TOP_CENTER });
        }
        if (resq.data.status === "success") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          getUsers();
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        } else if (resq.data.status === "failed") {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <SideBar />
      <div className="titles">
        <Container style={{ width: "900px" }}>
          <div className="admin-main">
            <div>
              <Link to="/admin">
                <AiOutlineLeft fa-lg />
              </Link>
              Edit admin
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
                  placeholder={admin.name}
                />
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.name}
                </p>
              </Form.Group>
              <Form.Label>Admin Type</Form.Label>
              <Form.Select id="select" value={role} onChange={handleSelect}>
                <option></option>
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
                  onChange={(e) => setNotificationPermission(e.target.checked)}
                />
                <Form.Check
                  inline
                  label="Report"
                  name="reportPermission"
                  value={reportPermission}
                  onChange={(e) => setreportPermission(e.target.checked)}
                />
                <Form.Check
                  inline
                  label="Admin"
                  name="AdminPermission"
                  value={AdminPermission}
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
                  cursor: "pointer",
                }}
                type="submit"
                onClick={() => save()}
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

export default EditAdmin;
