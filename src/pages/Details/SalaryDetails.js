import React, { useState, useEffect } from "react";

// React router
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// React Strap
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import SideBar from "../../components/Sidebar/SideBar";

function SalaryDetails() {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [department1, setDeparment1] = useState([]);
  const [department2, setDeparment2] = useState([]);
  const [department3, setDeparment3] = useState([]);
  const [department4, setDeparment4] = useState([]);
  const [department5, setDeparment5] = useState([]);
  const [department6, setDeparment6] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/salary/getIndividualSalaryDetails/` +
          params.salaryId
      );

      setUser(response.data.data.notification);
      console.log(response);

      console.log(response.data.data.notification.departments[0].DeptName);
      setDeparment1(response.data.data.notification.departments[0].DeptName);

      console.log(response.data.data.notification.departments[1].DeptName);
      setDeparment2(response.data.data.notification.departments[1].DeptName);

      console.log(response.data.data.notification.departments[2].DeptName);
      setDeparment3(response.data.data.notification.departments[2].DeptName);

      console.log(response.data.data.notification.departments[3].DeptName);
      setDeparment4(response.data.data.notification.departments[3].DeptName);

      console.log(response.data.data.notification.departments[4].DeptName);
      setDeparment5(response.data.data.notification.departments[4].DeptName);

      console.log(response.data.data.notification.departments[5].DeptName);
      setDeparment6(response.data.data.notification.departments[5].DeptName);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/salary">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Detail Salary Table
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Salary ID</td>
                  <td style={{ paddingLeft: "150px" }}>{user.salaryId}</td>
                </tr>
                <tr>
                  <td>Salary Type</td>
                  <td style={{ paddingLeft: "150px" }}>{user.salaryType}</td>
                </tr>

                <tr>
                  <td>Min Salary</td>
                  <td style={{ paddingLeft: "150px" }}>{user.minSalary}</td>
                </tr>

                <tr>
                  <td>Max Salary</td>
                  <td style={{ paddingLeft: "150px" }}>{user.maxSalary}</td>
                </tr>

                <br />
                <h4>Departments</h4>

                <tr>
                  {/* <td>Department-1</td> */}
                  <td>{department1}</td>
                </tr>

                <tr>
                  {/* <td>Department-2</td> */}
                  <td>{department2}</td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td>{department3}</td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td>{department4}</td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td>{department5}</td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td>{department6}</td>
                </tr>

                <tr>
                  <td>Created At</td>
                  <td style={{ paddingLeft: "150px" }}>{user.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default SalaryDetails;
