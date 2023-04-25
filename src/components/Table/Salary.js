import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";

const Salary = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [isBlocked, setIsBlocked] = useState("");

  function handleSelect(e) {
    setIsBlocked(e.target.value);
  }

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/salary/list?limit=1000&skip=0&isBlocked=${isBlocked}`
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function blockSalary(salaryId) {
    await fetch(`http://localhost:5000/salary/block/${salaryId}`, {
      method: "POST",
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
  // const params = useParams()
  // const cId = params.cId

  const colunms = [
    {
      name: (
        <h6>
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.salaryId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Salary Type</b>
        </h6>
      ),
      selector: (row) => row.salaryType,
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
          <b>Minimum Range</b>
        </h6>
      ),
      selector: (row) => row.minSalary,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Max Range</b>
        </h6>
      ),
      selector: (row) => row.maxSalary,
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
            onClick={() => navigate(`/editSalary/${row.salaryId}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>

          <button
            style={{ border: "none", background: "none" }}
            onClick={() => blockSalary(row.salaryId)}
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
  }, [isBlocked]);
  useEffect(() => {
    const result = countries.filter((country) => {
      return (
        country.salaryType.toLowerCase().match(search.toLowerCase()) ||
        country.maxSalary.toLowerCase().match(search.toLowerCase()) ||
        country.minSalary.toLowerCase().match(search.toLowerCase())
      );
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/salaryDetails/${row.salaryId}`);
  };
  return (
    <>
      <SideBar />

      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="Salary Table"
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
        {/* <Tooltip title="Add Salary" style={{ float: "right" }}>
          <Fab color="white" aria-label="add">
            <Link to="/addDepartment">
              <Add fontSize="large" />
            </Link>
          </Fab>
        </Tooltip> */}

        {/* <Modal show={show} onHide={handleClose}>
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
        </Modal> */}
      </div>
    </>
  );
};

export default Salary;
