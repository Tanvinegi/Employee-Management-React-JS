import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../Sidebar/SideBar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AppVersion = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState("");

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("apppId");
  };
  const handleShow = (apppId) => {
    setShow(true);
    localStorage.setItem("apppId", apppId);
  };
  function handleSelect(e) {
    setPlatform(e.target.value);
  }

  const getAppVersion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/version/list?limit=100&skip=0&platform=${platform}`
      );
      // console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteApp() {
    let appId = localStorage.getItem("apppId");
    await fetch(`http://localhost:3002/version/deleteAppVersion/${appId}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("App deletion successfull.", {
          position: toast.POSITION.TOP_CENTER,
        });
        getAppVersion();
        handleClose();
      });
    });
  }
  useEffect(() => {
    getAppVersion();
  }, [platform]);

  const colunms = [
    {
      name: (
        <h6>
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.appId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.appname,
      sortable: true,
    },

    {
      name: (
        <h6>
          <b>Platform</b>
        </h6>
      ),
      selector: (row) => row.platform,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Minimum Version</b>
        </h6>
      ),
      selector: (row) => row.minimumVersion,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Latest Version</b>
        </h6>
      ),
      selector: (row) => row.latestVersion,
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
            onClick={() => navigate(`/editversion/${row.appId}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>
          <button
            style={{ border: "none", background: "none" }}
            // onClick={() => deleteApp(row.appId)}
            onClick={() => handleShow(row.appId)}
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
    getAppVersion();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.appname.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/appdetails/${row.appId}`);
  };

  return (
    <>
      <SideBar />

      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="AppVersion"
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
                  name="platform"
                  value={platform}
                  onChange={handleSelect}
                >
                  <option value="">All</option>
                  <option>IOS</option>
                  <option>Web</option>
                  <option>Android</option>
                </Form.Select>
              </Form>
            </>
          }
        />
        <Tooltip title="Add Version" style={{ float: "right" }}>
          <Fab color="white" aria-label="add">
            <Link to="/addAppVersion">
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
            <Button variant="primary" onClick={deleteApp}>
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

export default AppVersion;
