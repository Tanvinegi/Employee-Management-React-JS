import React, { useState } from "react";

// Toast
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

// Components
// import { FormRow } from "../../../components";

// CSS
// import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import SideBar from "../../components/Sidebar/SideBar";

// React Router
import { useNavigate } from "react-router-dom";

// API
import { addEmployee } from "../../helper/EmployeeHelper/EmployeeApiCall";

const AddEmployeePage = () => {
  // navigate
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    DOB: "",
    DateOfJoining: "",
    gender: "",
    address: "",
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
    setUserData({ ...userData, error: false, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, DOB, DateOfJoining, gender, address } = userData;

    if ((!email, !name, !DOB, !DateOfJoining, !gender || !address)) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }

    addEmployee({ email, name, DOB, DateOfJoining, gender, address }).then(
      (data) => {
        console.log(data);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setUserData({
            ...userData,
            error: data.data.message,
            success: false,
          });
        } else if (data.data.status == 200) {
          setUserData({
            ...userData,
            success: true,
          });
          toast.success(data.data.message);

          setTimeout(() => {
            navigate("/addEmployee2");
          }, 3000);
        }
      }
    );
  };

  return (
    // <Wrapper>
    <>
      <SideBar />
      <Container style={{ width: "85%", marginLeft: "250px" }}>
        <form className="form" onSubmit={handleSubmit}>
          <h3> Add Employee</h3>
          <div className="form-center">
            {/* NAME */}
            <label>Name</label>
            <br />
            <br />
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              style={{ width: "70%" }}
            />
            <br />
            <br />
            <label>DOB</label>
            <br />
            <input
              type="date"
              name="DOB"
              value={userData.DOB}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <label>Date Of Joining</label>
            <br />
            <input
              type="date"
              name="DateOfJoining"
              value={userData.DateOfJoining}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <label>Gender</label>
            <br />
            {/* <br/> */}
            <input
              type="text"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <label>Address</label>
            <br />
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-block changes"
              onClick={handleSubmit}
              style={{
                backgroundColor: "black",
                fontSize: "20px",
                color: "#ffffff",
                width: "70%",
              }}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddEmployeePage;
