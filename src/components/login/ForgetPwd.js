import React, { useState } from "react";
import "./login.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../useForm";
import Validate from "../Validate";
import { toast } from "react-toastify";
import applifylogo from "../../images/applifylogo.png";

function ForgetPwd() {
  const navigate = useNavigate();
  const { formErrors } = useForm(Validate);
  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}-${value}`);
    setValues({
      ...values,
      [name]: value,
    });
  };
  const { email } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!email) {
    //   toast.error("Email required");
    // }
  };

  async function setPwd() {
    let item = { email };
    await fetch(`http://localhost:5000/admin/send-reset-password-email`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        console.log(resq);
        if (resq.statusCode === 400) {
          toast.error(resq.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (resq.data.status === "Success") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }

  return (
    <Container
      id="container"
      className="d-grid"
      // style={{ backgroundColor: Styles.backgroundColor }}
    >
      <Form id="login-form" className=" w-100 mt-0" onSubmit={handleSubmit}>
        <div id="header">
          <img className="logo" src={applifylogo} alt="" />
          <h5 className="fs-4 fw-normal text-muted">
            We love creative Business Ideas
          </h5>
        </div>
        <div className="form-group" id="info-div">
          <p id="info-p">
            Please enter your email address. You will receive a link to create a
            new password via email.
          </p>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <p style={{ color: "red", fontWeight: "bold" }}>{formErrors.email}</p>
        </Form.Group>

        <button id="btn" onClick={setPwd}>
          Get New Password
        </button>
        <div className="form-group mt-3" id="back-p">
          <Link to="/">
            <p id="back-login">Back to login</p>
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default ForgetPwd;
