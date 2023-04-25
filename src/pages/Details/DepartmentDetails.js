import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import "./common.css";

function DepartmentDetails() {
  const params = useParams();
  const [depatment, setDepatment] = useState([]);

  const getDepartment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/department/getIndividualDepartment/" +
          params.deptId
      );
      console.log(response);
      setDepatment(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/department">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Department Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{depatment.DeptName}</td>
                </tr>
                <tr>
                  <td>Salary Type</td>
                  <td>{depatment.salaryType}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{depatment.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default DepartmentDetails;
