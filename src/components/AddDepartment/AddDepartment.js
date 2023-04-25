import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../Sidebar/SideBar";

const AddDepartment = () => {
  const [DeptName, setDeptName] = useState("");
  const [salaryType, setSalaryType] = useState("");
  console.log(DeptName);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", DeptName);
  }

  async function save() {
    let item = {
      DeptName,
      salaryType,
    };
    console.log("edit", item);
    await fetch("http://localhost:5000/department/addDepartment", {
      method: "POST",
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
        } else if (resq.data.status === "success") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/department");
          }, 1000);
        } else if (resq.data.status === "failed") {
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

  return (
    <>
      <SideBar />
      <div className="titles">
        <Container style={{ width: "900px" }}>
          <div className="admin-main">
            <div>
              <Link to="/department">
                <AiOutlineLeft fa-lg />
              </Link>
              Add New Department
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Name</Form.Label>
                <Form.Control
                  value={DeptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  name="DeptName"
                  type="text"
                  placeholder={"Enter Department"}
                />

                <br />

                <Form.Label className="required-FIELD">Salary Type</Form.Label>
                <Form.Control
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                  name="salaryType"
                  type="text"
                  placeholder={"Enter Salary Type"}
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

export default AddDepartment;
