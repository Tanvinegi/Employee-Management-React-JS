import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../Sidebar/SideBar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Notification = () => {
  const imageurl = "http://localhost:3002/";
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("nId");
  };
  const handleShow = (nId) => {
    setShow(true);
    localStorage.setItem("nId", nId);
  };

  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/notificationList?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteNotification() {
    let notificationId = localStorage.getItem("nId");
    await fetch(`http://localhost:3002/deleteNotification/${notificationId}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("Notification deleted", {
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
          <b>ID</b>
        </h6>
      ),
      selector: (row) => row.notificationId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.Title,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Message</b>
        </h6>
      ),
      selector: (row) => row.message,
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
          width={80}
          height={50}
          style={{ border: "1px solid", objectFit: "cover" }}
          src={`${imageurl}${row.image}`}
        />
      ),

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
            style={{ border: "none", marginLeft: "30px", background: "none" }}
            onClick={() => handleShow(row.notificationId)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
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
      return (
        country.Title.toLowerCase().match(search.toLowerCase()) ||
        country.message.toLowerCase().match(search.toLowerCase())
      );
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/NotificationD/${row.notificationId}`);
  };
  return (
    <>
      <SideBar />

      <div style={{ padding: "40px", marginLeft: "230px" }}>
        <DataTable
          title="Notification"
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
        <Tooltip title="Add Notification" style={{ float: "right" }}>
          <Fab color="white" aria-label="add">
            <Link to="/addnotification">
              <Add fontSize="large" />
            </Link>
          </Fab>
        </Tooltip>

        {/* modelpopup */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Important message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={deleteNotification}>
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

export default Notification;
