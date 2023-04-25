import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Validate from "../Validate";
import useForm from "../useForm";
import SideBar from "../Sidebar/SideBar";

function AddAppVersion() {
  // const { handleSubmit, formErrors } = useForm(Validate);
  const navigate = useNavigate();
  const [minimumVersion, setMinimumVersion] = useState("");
  const [platform, setPlatform] = useState("");
  const [latestVersion, setLatestVersion] = useState("");
  const [appname, setAppName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", platform);
  }
  function handleSelect(e) {
    setPlatform(e.target.value);
  }
  console.log(appname, minimumVersion, platform, latestVersion);
  async function add() {
    if (!appname || !minimumVersion || !platform || !latestVersion) {
      return toast.error("Please Fill out all the Fields");
    }
    let item = { appname, minimumVersion, platform, latestVersion };
    console.log("APPdetails", item);

    await fetch("http://localhost:3002/version/addAppVersion", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        console.log("appdata", resq);
        if (resq.statusCode === 400) {
          toast.error(resq.message);
        }
        if (resq.data.status === "success") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/systemConfig/appversion");
          }, 1000);
        }
        if (resq.data.status === "failed") {
          toast.warn(resq.data.message);
        }
      });
    });
  }
  return (
    <>
      <SideBar />
      <div className="container">
        <Container style={{ width: "80%", marginLeft: "180px" }}>
          <div className="admin-main">
            <div>
              <Link to="/backtoversion">
                <AiOutlineLeft fa-lg />
              </Link>
              Add App Version
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>App Name</Form.Label>
                <Form.Control
                  value={appname}
                  onChange={(e) => setAppName(e.target.value)}
                  name="appname"
                  type="text"
                  placeholder="Enter Name"
                />
                {/* <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.latestVersion}
                </p> */}
              </Form.Group>
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
                <Form.Label>Version</Form.Label>
                <Form.Control
                  value={latestVersion}
                  onChange={(e) => setLatestVersion(e.target.value)}
                  name="latestVersion"
                  type="text"
                  placeholder="Enter Version"
                />
                {/* <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.latestVersion}
                </p> */}
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
                {/* <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.minimumVersion}
                </p> */}
              </Form.Group>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
                type="submit"
                onClick={add}
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

export default AddAppVersion;
