import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import "./common.css";
import profilelogo from "../../images/profil-photo-icon.jpg";

function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState([]);
  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/users/viewUser/" + params.id
      );
      setUser(response.data.data.data);
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
              <Link to="/usersM">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              User Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{user.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default UserDetails;
