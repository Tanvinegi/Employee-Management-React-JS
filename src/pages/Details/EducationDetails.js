import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
// import "./common.css";

function EducationDetails() {
  const params = useParams();
  const [education, setEducation] = useState([]);

  const getQualification = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/education/getIndividualEducation/" + params.eduId
      );
      console.log(response);
      setEducation(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQualification();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/education">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Education Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{education.eduId}</td>
                </tr>
                <tr>
                  <td>Salary Type</td>
                  <td>{education.eduName}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{education.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default EducationDetails;
