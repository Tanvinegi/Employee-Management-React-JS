import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useCookies } from "react-cookie";
import applifylogo from "../../images/applifylogo.png";
import bcrypt from "bcryptjs";
import Validate from "../Validate";
import { toast } from "react-toastify";
import { authenticate } from "../../helper/ApiCall.js";

function Login() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}-${value}`);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please Fill out all the Fields");
    }
    if (checkbox === true) {
      setCookie("email", email);
      setCookie("password", password);
      // removeCookie("email", { maxAge: 600 });
      // removeCookie("password", { maxAge: 600 });
    }
    console.log("emailcookie", cookie.email);
  };

  const { email, password } = values;
  async function signup() {
    console.log(password, email);

    let item = { email, password };
    console.log(item);
    let result = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    if (result) {
      console.log("Result", result.data.token);
      console.log("Result1", result.data.status);
      if (result.data.status === "failed") {
        toast.error(result.data.message);
        setValues({ ...values, error: result.data.message, success: false });
      } else if (result.data.status === "Success") {
        authenticate(result, () => {
          setValues({
            ...values,
            success: true,
            isMember: false,
          });
          // let userdata = JSON.stringify(result);
          // localStorage.setItem("user", JSON.stringify(userdata));
          toast.success(result.data.message);

          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        });
      }
    }
    console.log(result);
  }

  const [checkbox, setCheckbox] = useState(false);
  const handleCheckChange = (e) => {
    setCheckbox(e.target.checked);
  };

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
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            value={cookie.email ? (values.email = cookie.email) : values.email}
            // defaultValue={
            //   cookie.email ? (values.email = cookie.email) : values.email
            // }
          />
          <p style={{ color: "red", fontWeight: "bold" }}>{formErrors.email}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            value={
              cookie.password
                ? (values.password = cookie.password)
                : values.password
            }
            // defaultValue={
            //   cookie.password
            //     ? (values.password = cookie.password)
            //     : values.password
            // }
          />
          <p style={{ color: "red", fontWeight: "bold" }}>
            {formErrors.password}
          </p>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
        <div className="form-group row">
          <div className="col">
            <input
              type="checkbox"
              onChange={handleCheckChange}
              name="checkbox"
              value={checkbox}
              defaultChecked={cookie.email ? true : false}
              // onClick={handle}
            />
            <label htmlFor="">Remember Me</label>
          </div>
          <div className="col">
            <Link to="/forgetPwd">
              <p id="para">Forgot password?</p>
            </Link>
          </div>
        </div>
        {/* </Form.Group> */}

        <button id="btn" onClick={signup}>
          Login
        </button>
        <br />
        <br />
        <Form.Label>
          Not Registered? <Link to="/register">Register Here</Link>
        </Form.Label>
      </Form>
    </Container>
  );
}

export default Login;
