import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import { getAllUser } from "../../helper/ApiCall";
import "./Admintable.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import profilelogo from "../../images/profil-photo-icon.jpg";

const AdminTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);
  let user = JSON.parse(localStorage.getItem("jwt"));
  const userid = user.data.user.uId;

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("adminId");
  };
  const handleShow = (adminId) => {
    setShow(true);
    localStorage.setItem("adminId", adminId);
  };
  const [values, setValues] = useState({
    error: "",
    success: "false",
    datas: [],
  });
  const admin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/admin/getOnlyAdmins"
      );
      console.log(response.data.data.data.rows);

      setCountries(response.data.data.data.rows);
      setFiltercountries(response.data.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const preload = () => {
    getAllUser().then((data) => {
      console.log(data);
      console.log(data.data.rows);

      if (data.data.statusCode == 400) {
        toast.error(data.data.message);
        setValues({ ...values, error: data.data.message, success: false });
      } else {
        setValues({ ...values, datas: data.data.rows });
      }
    });
  };

  console.log(values.datas);
  var { datas } = values;
  useEffect(() => {
    preload();
  }, []);

  async function deleteAdmin() {
    let uId = localStorage.getItem("adminId");
    await fetch(`http://localhost:3002/admin/deleteAdmin/${uId}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("Admin deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        admin();
        handleClose();
      });
    });
  }

  async function blockAdmin(uId) {
    await fetch(`http://localhost:3002/admin/blockAdmin/${uId}`, {
      method: "POST",
    }).then((result) => {
      result.json().then((resq) => {
        console.log("blockinfo", resq);
        if (resq.data.status === "200") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (resq.data.status === "201") {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(resq.data.message);
        }
        admin();
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
      selector: (row) => row.uId,
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
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Email</b>
        </h6>
      ),
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Image</b>
        </h6>
      ),
      selector: (row) =>
        row.image ? (
          <img
            alt=""
            width={80}
            height={50}
            style={{ objectFit: "cover", border: "1px solid" }}
            src={`http://localhost:3002/${row.image}`}
          />
        ) : (
          <img
            alt=""
            width={80}
            height={50}
            style={{ objectFit: "cover", border: "1px solid" }}
            src={profilelogo}
          />
        ),
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Access</b>
        </h6>
      ),
      selector: (row) => [
        row.dashBoardPermission == "1" ? (
          <span className="badge bg-secondary access">Dashboard</span>
        ) : (
          ""
        ),
        row.userManagementPermission == "1" ? (
          <>
            <span className="badge bg-primary">User</span>
          </>
        ) : (
          ""
        ),
        row.AdminPermission == "1" ? (
          <span className="badge bg-success">Admin</span>
        ) : (
          ""
        ),
        row.NotificationPermission == "1" ? (
          <>
            <span className="badge bg-danger">Notification</span>
          </>
        ) : (
          ""
        ),
        row.systemConfigPermission == "1" ? (
          <span className="badge bg-info access">System</span>
        ) : (
          ""
        ),
        row.reportPermission == "1" ? (
          <>
            <span className="badge bg-warning ">Report</span>
          </>
        ) : (
          ""
        ),
      ],
      grow: 1,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      selector: (row) =>
        row.uId === userid ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "110px",
            }}
          >
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => navigate(`/editadmin/${row.uId}`)}
            >
              <i className="fa-solid fa-pen fa-lg"></i>
            </button>
            <button
              style={{ border: "none", background: "none" }}
              // onClick={() => deleteAdmin(row.uId)}
              onClick={() => handleShow(row.uId)}
            >
              <i className="fa-regular fa-trash-can fa-lg"></i>
            </button>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => blockAdmin(row.uId)}
            >
              <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
            </button>

            {/* save work */}
            {/* <button
            style={{ border: "none", background: "none" }}
            onClick={() => blockAdmin(row.uId)}
          >
            <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
          </button> */}
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
    admin();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return (
        country.name.toLowerCase().match(search.toLowerCase()) ||
        country.email.toLowerCase().match(search.toLowerCase())
      );
    });
    setFiltercountries(result);
  }, [search]);
  console.log(admin);

  const handleRowClicked = (row) => {
    navigate(`/admindetails/${row.uId}`);
  };

  return (
    <>
      <SideBar />

      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <span></span>
        <DataTable
          title="Admin"
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
        <Tooltip title="Add Admin" style={{ float: "right" }}>
          <Fab color="white" aria-label="add">
            <Link to="/addAdmin">
              <Add fontSize="large" />
            </Link>
          </Fab>
        </Tooltip>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={deleteAdmin}>
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

export default AdminTable;
