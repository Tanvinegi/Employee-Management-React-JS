import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import profilelogo from "../../images/profilelogo.svg.png";
import "./common.css";

function CategoryDetails() {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/displayCategory/" + params.cId
      );
      setCategories(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/systemConfig/categories">
                <AiOutlineLeft fa-lg color="black" />
              </Link>
              Category Details
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{categories.name}</td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td>
                    {categories.image ? (
                      <img
                        width={150}
                        height={100}
                        style={{ objectFit: "cover", border: "1px solid" }}
                        src={`http://localhost:3002/${categories.image}`}
                        alt=""
                      />
                    ) : (
                      <img
                        width={150}
                        height={100}
                        style={{ objectFit: "cover", border: "1px solid" }}
                        src={profilelogo}
                        alt=""
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{categories.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default CategoryDetails;
