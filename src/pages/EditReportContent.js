import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SideBar from "../components/Sidebar/SideBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import axios from "axios";

function EditReportContent() {
  const params = useParams();
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [Description, setDescription] = useState([]);

  function handleSelect(e) {
    setStatus(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log("data", platform);
    if (!Status || !Description) {
      toast.error("Fill out all the fields.");
    }
  }

  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/ReprotedContent/list?limit=10&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function save() {
    let item = { Status, Description };
    console.log("reportedit", item);
    await fetch("http://localhost:3002/ReprotedContent/edit/" + params.Id, {
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
          getCountries();
          setTimeout(() => {
            navigate("/reports/reportContent");
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
    getCountries();
  }, []);

  return (
    <>
      <SideBar />
      <div className="titles">
        <Container style={{ width: "100%", marginLeft: "280px" }}>
          <div className="admin-main">
            <div>
              <Link to="/reports/reportContent">
                <AiOutlineLeft fa-lg />
              </Link>
              Update Report Status
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select size="sm" value={Status} onChange={handleSelect}>
                  <option disabled></option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="declined">Declined</option>
                </Form.Select>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                  name="Description"
                  value={Description}
                />
                {/* <p style={{ color: "red", fontWeight: "bold" }}>{formErrors.email}</p> */}
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
}

export default EditReportContent;
