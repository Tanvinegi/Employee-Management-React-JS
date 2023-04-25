import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";

const ViewBlockedDepartments = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);
  const [isBlocked, setIsBlocked] = useState("");

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/department/getBlockedDepartment`
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function blockDepartment(deptId) {
    await fetch(`http://localhost:5000/department/blockDepartment/${deptId}`, {
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
      selector: (row) => row.deptId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.DeptName,
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
            onClick={() => navigate(`/editDepartment/${row.deptId}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>

          <button
            style={{ border: "none", background: "none" }}
            onClick={() => blockDepartment(row.deptId)}
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
      return country.DeptName.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/departmentDetails/${row.deptId}`);
  };
  return (
    <>
      <SideBar />

      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="Department"
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
            <Link to="/addDepartment">
              <Add fontSize="large" />
            </Link>
          </Fab>
        </Tooltip>
      </div>
    </>
  );
};

export default ViewBlockedDepartments;
