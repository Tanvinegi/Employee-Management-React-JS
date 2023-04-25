import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import useForm from "../useForm";
import Validate from "../Validate";
import SideBar from "../Sidebar/SideBar";
import axios from "axios";
function AddCategory() {
  const { handleChange, values, handleSubmit, formErrors } = useForm(Validate);
  const { name } = values;
  const [image, setImage] = useState("");

  function handlleImage(e) {
    setImage(e.target.files[0]);
  }
  const navigate = useNavigate();
  async function addCategory() {
    if (!name || !image) {
      return toast.error("Fields required");
    }
    const data = new FormData();
    data.append("name", name);
    data.append("image", image, image.name);
    // let result = await axios.post(
    //   "http://localhost:3002/api/addCategory",
    //   data
    // );
    // if (result.data.data.status === "success") {
    //   toast.success("Category added successfully");
    // } else {
    //   console.log("result", result);
    //   toast.error("Something went wrong.");
    // }
    // setTimeout(() => {
    //   navigate("/systemConfig/categories");
    // }, 1000);

    await fetch("http://localhost:3002/api/addCategory", {
      method: "POST",
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
          setTimeout(() => {
            navigate("/systemConfig/categories");
          }, 1000);
        }
      });
    });
  }

  return (
    <>
      <SideBar />
      <div className="container">
        <Container style={{ width: "80%", marginLeft: "235px" }}>
          <div>
            <Link to="/systemConfig/categories">
              <AiOutlineLeft fa-lg />
            </Link>
            Add Category
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={handleChange}
                name="name"
                value={name}
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.name}
              </p>
            </Form.Group>

            <button id="btn" onClick={addCategory}>
              Save
            </button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default AddCategory;
