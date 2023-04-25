import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { TiTick } from "react-icons/ti";
import Form from "react-bootstrap/Form";

const Qualification = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isBlocked, setIsBlocked] = useState("");

  function handleSelect(e) {
    setIsBlocked(e.target.value);
  }

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("adminId");
  };
  const handleShow = (adminId) => {
    setShow(true);
    localStorage.setItem("adminId", adminId);
  };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/education/list?limit=100&skip=0&isBlocked=${isBlocked}`
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function blockEducation(eduId) {
    await fetch(`http://localhost:5000/education/block/${eduId}`, {
      method: "PUT",
    }).then((result) => {
      result.json().then((resq) => {
        console.log("blockinfo", resq);
        if (resq.data.status === 200) {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (resq.data.status === 201) {
          toast(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(resq.data.message);
        }
        getCountries();
      });
    });
  }

  const colunms = [
    {
      name: (
        <h6>
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.eduId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.eduName,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>createdAt</b>
        </h6>
      ),
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "110px",
          }}
        >
          <button
            onClick={() => navigate(`/editEducation/${row.eduId} `)}
            style={{ border: "none" }}
          >
            <i className="fa-solid fa-pen fa-lg" style={{ color: "blue" }}></i>
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => blockEducation(row.eduId)}
          >
            {row.isBlocked ? (
              <TiTick size={30} color="green" />
            ) : (
              <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
            )}
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getCountries();
  }, [isBlocked]);

  useEffect(() => {
    const result = countries.filter((country) => {
      return (
        country.eduName.toLowerCase().match(search.toLowerCase()) ||
        country.createdAt.toLowerCase().match(search.toLowerCase()) ||
        country.eduId.toLowerCase().match(search.toLowerCase())
      );
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/educationDetails/${row.eduId}`);
  };
  return (
    <>
      <SideBar />
      <div style={{ marginLeft: "235px", width: "1000px" }}>
        <DataTable
          title="Qualification"
          columns={colunms}
          data={filtercountries}
          pagination
          fixedHeader
          // fixedHeaderScrollHeight="500px"
          selectableRowsHighlight
          highlightOnHover
          subHeader
          onRowClicked={handleRowClicked}
          subHeaderComponent={
            <>
              <input
                type="text"
                placeholder="Search here"
                className="  form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Form style={{ float: "left" }}>
                <Form.Label>Apply Filter</Form.Label>
                <Form.Select
                  id="select"
                  name="isBlocked"
                  value={isBlocked}
                  onChange={handleSelect}
                >
                  <option value="">All</option>
                  <option value="1">Blocked</option>
                  <option value="0">Un-Blocked</option>
                </Form.Select>
              </Form>
            </>
          }
        />
        <Tooltip title="Add Qualification" style={{ float: "right" }}>
          <Fab color="#f6e58d" aria-label="add">
            <Link to="/addEducation">
              <Add fontSize="large" />
            </Link>
          </Fab>
        </Tooltip>
        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Important message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={deleteAdminAchivement}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal> */}
      </div>
    </>
  );
};

export default Qualification;
