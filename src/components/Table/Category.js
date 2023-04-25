import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";

const Category = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("cId");
  };
  const handleShow = (catId) => {
    setShow(true);
    localStorage.setItem("cId", catId);
  };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/list?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  // const params = useParams()
  // const cId = params.cId

  async function deleteCategory() {
    let cId = localStorage.getItem("cId");
    await fetch(`http://localhost:3002/api/deleteCategory/${cId}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("Admin delete successfull", {
          position: toast.POSITION.TOP_CENTER,
        });
        getCountries();
        handleClose();
      });
    });
  }
  const colunms = [
    {
      name: (
        <h6>
          <b>Sr. No</b>
        </h6>
      ),
      selector: (row) => row.cId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Image</b>
        </h6>
      ),
      selector: (row) => (
        <img
          alt=""
          width={90}
          height={90}
          style={{ objectFit: "cover", border: "1px solid" }}
          src={`http://localhost:3002/${row.image}`}
        />
      ),
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>CreatedAt</b>
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
            style={{ border: "none", background: "none" }}
            onClick={() => handleShow(row.cId)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => navigate(`/editcategory/${row.cId}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>
        </div>
      ),
    },
  ];

  const paginationComponentOptions = {
    rangeSeparatorText: "Total",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/categorydetails/${row.cId}`);
  };
  return (
    <>
      <SideBar />

      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="Category"
          columns={colunms}
          data={filtercountries}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          onRowClicked={handleRowClicked}
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search here"
              className="  form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
        <Tooltip title="Add Category" style={{ float: "right" }}>
          <Fab color="white" aria-label="add">
            <Link to="/addcategory">
              <Add fontSize="large" />
            </Link>
          </Fab>
        </Tooltip>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Important message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={deleteCategory}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Category;
