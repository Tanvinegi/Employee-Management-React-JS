import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import "./common.css";

function AdminAchiDetails() {
  const params = useParams();
  const [achievement, setAchievement] = useState([]);
  const getAchievement = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/achievement/viewAchievement/" + params.Id
      );
      setAchievement(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAchievement();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/systemConfig/adminachievement">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Admin Achievement Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>{achievement.Id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{achievement.name}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>{achievement.Type}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{achievement.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default AdminAchiDetails;
