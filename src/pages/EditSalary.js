import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import SideBar from "../components/Sidebar/SideBar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditSalary = () => {
  const [salaryType, setSalaryType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salary, setSalary] = useState([]);

  console.log(salaryType);
  console.log(minSalary);
  console.log(maxSalary);

  const navigate = useNavigate();
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", salaryType);
    console.log("data", minSalary);
    console.log("data", maxSalary);
  }

  const getSalary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/salary/getIndividualSalary/" + params.salaryId
      );
      console.log(response);
      setSalary(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  async function save() {
    let item = {
      salaryType,
      minSalary,
      maxSalary,
    };

    console.log("edit", item);
    await fetch(`http://localhost:5000/salary/edit/` + params.salaryId, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        console.log("This is resq ", resq);
        if (resq.data.status === 400) {
          return toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (resq.statusCode === 200) {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          getSalary();
          setTimeout(() => {
            navigate("/salary");
          }, 2000);
        } else if (resq.data.status === "failed") {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }

  useEffect(() => {
    getSalary();
  }, []);

  return (
    <>
      <SideBar />
      <div className="titles">
        <Container style={{ width: "900px" }}>
          <div className="admin-main">
            <div>
              <Link to="/salary">
                <AiOutlineLeft fa-lg />
              </Link>
              Edit Salary Range
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Salary Type</Form.Label>
                <Form.Control
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                  name="salaryType"
                  type="text"
                  placeholder={salary.salaryType}
                />

                {/* <br /> */}

                <Form.Label className="required-FIELD">Min Salary</Form.Label>
                <Form.Control
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  name="minSalary"
                  type="text"
                  placeholder={salary.minSalary}
                />

                <Form.Label className="required-FIELD">Max Salary</Form.Label>
                <Form.Control
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  name="maxSalary"
                  type="text"
                  placeholder={salary.maxSalary}
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

export default EditSalary;
