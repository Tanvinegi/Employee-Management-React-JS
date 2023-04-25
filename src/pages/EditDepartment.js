import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "../pages/Addadmin.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditDepartment = () => {
  const [salaryType, setsalaryType] = useState("");
  const [DeptName, setDeptName] = useState("");
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
  }

  const getDepartment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/department/getIndividualDepartment/" +
          params.deptId
      );
      console.log(response);
      setDepartment(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  async function save() {
    let item = { DeptName, salaryType };
    console.log("APPedit", item);
    await fetch("http://localhost:5000/department/edit/" + params.deptId, {
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
          toast.error(resq.message);
        } else if (resq.data.status === "Success") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          getDepartment();
          setTimeout(() => {
            navigate("/department");
          }, 1000);
        } else if (resq.data.status === "Failed") {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }
  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <>
      <SideBar />
      <div className="container">
        <Container style={{ width: "100%", marginLeft: "130px" }}>
          <div className="admin-main">
            <div>
              <Link to="/department">
                <AiOutlineLeft fa-lg />
              </Link>
              Edit Department
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                value={DeptName}
                onChange={(e) => setDeptName(e.target.value)}
                name="DeptName"
                type="text"
                placeholder={department.DeptName}
              />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Salary Type</Form.Label>
                <Form.Control
                  value={salaryType}
                  onChange={(e) => setsalaryType(e.target.value)}
                  name="salaryType"
                  type="text"
                  placeholder={department.salaryType}
                />
              </Form.Group>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
                type="submit"
                onClick={save}
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

export default EditDepartment;
