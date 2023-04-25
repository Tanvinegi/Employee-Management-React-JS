import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import profilelogo from "../../images/profil-photo-icon.jpg";
import Form from "react-bootstrap/Form";

const AdminTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);
  const [isBlocked, setIsBlocked] = useState("");

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("userId");
  };
  const handleShow = (id) => {
    setShow(true);
    localStorage.setItem("userId", id);
  };

  function handleSelect(e) {
    setIsBlocked(e.target.value);
  }

  // localhost:3002/users/getOnlyUsers
  const admin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/users/List?limit=10&skip=0&isBlocked=${isBlocked}`
      );
      console.log(response.data.data.rows);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteUser() {
    let id = localStorage.getItem("userId");
    await fetch(`http://localhost:3002/users/deleteUser/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("User deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        admin();
        handleClose();
      });
    });
  }

  async function blockUser(id) {
    await fetch(`http://localhost:3002/users/blockUser/${id}`, {
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
      selector: (row) => row.id,
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
          <b>Email</b>
        </h6>
      ),
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Created At</b>
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
      selector: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "110px",
          }}
        >
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => handleShow(row.id)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => blockUser(row.id)}
          >
            <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
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
    admin();
  }, [isBlocked]);
  useEffect(() => {
    const result = countries.filter((country) => {
      return (
        country.name.toLowerCase().match(search.toLowerCase()) ||
        country.email.toLowerCase().match(search.toLowerCase())
      );
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/userdetails/${row.id}`);
  };
  return (
    <>
      <SideBar />

      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <span></span>
        <DataTable
          title="User Table"
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={deleteUser}>
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
