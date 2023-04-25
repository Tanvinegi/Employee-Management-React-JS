import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../pages/Addadmin.css";
import applifylogo from "../../images/applifylogo.png";

import Validate from "../Validate";
import useForm from "../useForm";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Registration = () => {
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [selects, setSelects] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All Fields Are Required.");
    }
  }
  async function signup() {
    console.log(name, password, email);
    let item = { name, password, email };
    console.log(item);
    let result = await fetch("http://localhost:5000/admin/Registration", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    toast.success("Admin Register successfully, Please login", {
      position: toast.POSITION.TOP_CENTER,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
    console.log(result);
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
          />
          <p style={{ color: "red", fontWeight: "bold" }}>{formErrors.name}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            // defaultValue={
            //   cookie.email ? (values.email = cookie.email) : values.email
            // }
          />
          <p style={{ color: "red", fontWeight: "bold" }}>{formErrors.email}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
          <p style={{ color: "red", fontWeight: "bold" }}>
            {formErrors.password}
          </p>
        </Form.Group>
        <Button
          style={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
          }}
          type="submit"
          onClick={signup}
        >
          Register
        </Button>
        <br />
        <br />
        <div className="form-group mt-3" id="back-p">
          <Link to="/">
            <p id="back-login">Back to login</p>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Registration;
