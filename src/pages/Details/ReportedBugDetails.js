import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import "./common.css";

function ReportedBugDetails() {
  const params = useParams();
  const [report, setReport] = useState([]);
  const getReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/RepotedBug/get/" + params.Id
      );
      setReport(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReport();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/reports/reportbug">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Reported Bug Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Reported By</td>
                  <td>{report.ReportedBy}</td>
                </tr>
                <tr>
                  <td>Reported Item</td>
                  <td>{report.ReportedItem}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{report.Status}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{report.Date}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ReportedBugDetails;
