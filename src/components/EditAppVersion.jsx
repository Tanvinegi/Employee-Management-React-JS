import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "../pages/Addadmin.css";
import Validate from "../components/Validate";
import useForm from "../components/useForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import { toast } from "react-toastify";
import axios from "axios";
//------------
const EditAppVersion = () => {
  const { values, formErrors } = useForm(Validate);

  const [minimumVersion, setMinimumVersion] = useState("");
  const [platform, setPlatform] = useState("");
  const [latestVersion, setLatestVersion] = useState("");
  const [app, setApp] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", platform);
  }

  function handleSelect(e) {
    setPlatform(e.target.value);
  }

  const getVersion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/version/list?limit=100&skip=0"
      );
      console.log(response.data.data.rows);
      setApp(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  async function save() {
    let item = { minimumVersion, platform, latestVersion };
    console.log("APPedit", item);
    await fetch(
      "http://localhost:3002/version/editAppVersion/" + params.appId,
      {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((result) => {
      result.json().then((resq) => {
        console.log("This is resq ", resq);
        if (resq.statusCode === 400) {
          toast.error(resq.message);
        } else if (resq.data.status === "success") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          getVersion();
          setTimeout(() => {
            navigate("/systemConfig/appversion");
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
  useEffect(() => {
    getVersion();
  }, []);

  return (
    <>
      <SideBar />
      <div className="container">
        <Container style={{ width: "100%" }}>
          <div className="admin-main">
            <div>
              <Link to="/backtoappversion">
                <AiOutlineLeft fa-lg />
              </Link>
              Edit App Version
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Label>Name</Form.Label>
              <Form.Select
                id="select"
                name="platform"
                value={platform}
                onChange={handleSelect}
              >
                <option>IOS</option>
                <option>Web</option>
                <option>Android</option>
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Version</Form.Label>
                <Form.Control
                  value={latestVersion}
                  onChange={(e) => setLatestVersion(e.target.value)}
                  name="latestVersion"
                  type="text"
                  placeholder="Enter Version"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">
                  Minimum Version
                </Form.Label>
                <Form.Control
                  value={minimumVersion}
                  onChange={(e) => setMinimumVersion(e.target.value)}
                  name="minimumVersion"
                  type="text"
                  placeholder="Enter minimum version"
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

export default EditAppVersion;
