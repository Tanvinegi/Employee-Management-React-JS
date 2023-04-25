import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useForm from "../useForm";
import Validate from "../Validate";
import Form from "react-bootstrap/Form";
import "../../pages/Addadmin.css";
import profilelogo from "../../images/dplogo.png";

const Profile = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("jwt"));
  const userimage = user.data.user.image;
  const email = user.data.user.email;
  const { handleSubmit } = useForm(Validate);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handlleImage(e) {
    setImage(e.target.files[0]);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  async function update() {
    if (!name || !image) {
      return toast.error("Fields required");
    }
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("image", image, image.name);

    await fetch("http://localhost:3002/admin/editAdminProfile", {
      method: "PUT",
      body: data,
    }).then((result) => {
      result.json().then((resq) => {
        console.log("response", resq);
        if (resq.statusCode === 400) {
          toast.error(resq.message, { position: toast.POSITION.TOP_CENTER });
        } else if (resq.data.status === "success") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }

  return (
    <Container>
      <div className="admin-main">
        <Form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <Form.Group>
            <div>
              {userimage ? (
                <img
                  src={`http://localhost:3002/${userimage}`}
                  alt="profile-pic"
                  id="profilepicc"
                />
              ) : (
                <img src={profilelogo} alt="profile-pic" id="profilepicc" />
              )}
            </div>
            <br />
            <div>
              <label for="formFile" className="form-label">
                Upload Image
              </label>
              <br />
              <div className="profile">
                <img src="images/profilelogo.svg.png" id="photo" />
                <input
                  className="form-control"
                  type="file"
                  id="file"
                  name="image"
                  style={{ width: "100%" }}
                  onChange={handlleImage}
                />
                <label htmlFor="file" id="uploadBtn">
                  Choose Photo
                </label>
              </div>
            </div>
          </Form.Group>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required-FIELD">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              // value={name}
              defaultValue={user.data.user.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={email} readOnly />
          </Form.Group>
          <Button
            style={{ width: "100%", backgroundColor: "black", color: "white" }}
            type="submit"
            onClick={update}
          >
            Save
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Profile;
