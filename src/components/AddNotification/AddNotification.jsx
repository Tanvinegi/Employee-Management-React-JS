import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { AiOutlineLeft } from "react-icons/ai";
import { Container } from "react-bootstrap";
import useForm from "../useForm";
import Validate from "../Validate";
import SideBar from "../Sidebar/SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddNotification() {
  const { handleChange, values, handleSubmit, formErrors } = useForm(Validate);
  const [userType, setUserType] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  function handlleImage(e) {
    setImage(e.target.files[0]);
  }

  function handleSelectChange(e) {
    setUserType(e.target.value);
  }

  const { Title, message } = values;
  async function addNotification() {
    if (!image) {
      return toast.error("Please select an image.");
    }
    const data = new FormData();
    data.append("Title", Title);
    data.append("message", message);
    data.append("userType", userType);
    data.append("image", image, image.name);
    let result = await axios.post(
      "http://localhost:3002/addNotification",
      data
    );
    if (result.data.data.status === "success") {
      toast.success("Notification added successfully");
    } else {
      console.log("result", result);
      toast.error("Something went wrong.");
    }
    setTimeout(() => {
      navigate("/notification");
    }, 1000);
  }

  return (
    <>
      <SideBar />
      <div className="container">
        <Container style={{ width: "80%", marginLeft: "180px" }}>
          <div>
            <Link to="/notification">
              <AiOutlineLeft fa-lg />
            </Link>
            Add Notificaton
          </div>
          <hr />
          <Form
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <Form.Group>
              <div>
                <label for="formFile" className="form-label">
                  Upload Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="image"
                  style={{ width: "100%" }}
                  onChange={handlleImage}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={handleChange}
                name="Title"
                value={Title}
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.Title}
              </p>
            </Form.Group>
            <Form.Label>platform Type</Form.Label>
            <Form.Select
              size="sm"
              onChange={handleSelectChange}
              value={userType}
            >
              <option>Android</option>
              <option>IOS</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Message"
                onChange={handleChange}
                name="message"
                value={message}
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.message}
              </p>
            </Form.Group>

            <button id="btn" onClick={addNotification}>
              Save
            </button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default AddNotification;
