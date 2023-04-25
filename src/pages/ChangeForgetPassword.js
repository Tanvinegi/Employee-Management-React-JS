import React, { useEffect, useState } from "react";
import "../components/login/login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import applifylogo from "../images/applifylogo.png";
import { toast } from "react-toastify";

function ChangeForgetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const adminId = params.adminId;
  const token = params.token;
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}-${value}`);
    setValues({
      ...values,
      [name]: value,
    });
  };
  const { password, confirmPassword } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
  };

  async function setPwd() {
    let item = { adminId, token, password, confirmPassword };
    console.log("params items", item);
    await fetch(`http://localhost:5000/admin/setpassword`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        if (resq.data.status === 200) {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (resq.data.status === 400) {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (resq.data.status === 201) {
          toast(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }

  return (
    <Container id="container" className="d-grid">
      <Form id="login-form" className=" w-100 mt-0" onSubmit={handleSubmit}>
        <div id="header">
          <img className="logo" src={applifylogo} alt="" />
          <h5 className="fs-3 fw-normal text-muted">
            We love creative Business Ideas
          </h5>
        </div>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Enter New Password"
            name="password"
            value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
          />
        </Form.Group>
        <button id="btn" onClick={setPwd}>
          Save
        </button>
      </Form>
    </Container>
  );
}

export default ChangeForgetPassword;
