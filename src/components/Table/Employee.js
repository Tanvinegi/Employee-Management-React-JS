import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";

// Axios
import axios from "axios";

// React Toastify
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import { GrView } from "react-icons/gr";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// React Router DOM
import { useNavigate, Link } from "react-router-dom";

// React Table
import DataTable from "react-data-table-component";

// React Bootstrap
import Form from "react-bootstrap/Form";

var result;

const Employee = () => {
  // use Navigate
  const navigate = useNavigate();

  // For Searching in Table
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const [isBlocked, setIsBlocked] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  console.log(isBlocked);

  // PAGINATION
  const paginationComponentOptions = {
    rangeSeparatorText: "Total",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("id");
  };
  const handleShow = (id) => {
    setShow(true);
    localStorage.setItem("id", id);
  };

  // TODO: API CALLS
  const preload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/userDetails`
      );
      console.log(response);
      setData(response.data.data.data);
      setFilter(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function blockUser(id) {
    await fetch(`http://localhost:5000/user/block/${id}`, {
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
          toast(resq.data.message);
        }
        preload();
      });
    });
  }

  async function deleteUser() {
    let id = localStorage.getItem("id");
    await fetch(`http://localhost:5000/user/delete/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("User deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        preload();
        handleClose();
      });
    });
  }

  useEffect(() => {
    preload();
  }, [search]);

  useEffect(() => {
    preload();
  }, [isBlocked]);

  // TABLE Structure
  const colunms = [
    {
      name: (
        <h5>
          <b>Emp_ID</b>
        </h5>
      ),
      selector: (row) => row.id,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Employee Name</b>
        </h5>
      ),
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Employee Email</b>
        </h5>
      ),
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Department Allocated-1</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[0]?.DeptName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Department Allocated-2</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[1]?.DeptName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Department Allocated-3</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[2]?.DeptName,
      sortable: true,
    },

    // {
    //   name: (
    //     <h5>
    //       <b>Education</b>
    //     </h5>
    //   ),
    //   selector: (row) => row.employeeDepts[0]?.employeeEdus[0]?.eduName,
    //   sortable: true,
    // },
    {
      name: (
        <h6>
          <b>Education</b>
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
            onClick={() => navigate(`/viewEducation/${row.id} `)}
            style={{ border: "none" }}
          >
            <GrView />
          </button>
        </div>
      ),
    },
    {
      name: (
        <h6>
          <b>Salary</b>
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
            onClick={() => navigate(`/viewSalary/${row.id} `)}
            style={{ border: "none" }}
          >
            <GrView />
          </button>
        </div>
      ),
    },
    // {
    //   name: (
    //     <h5>
    //       <b>Education Qualification-2</b>
    //     </h5>
    //   ),
    //   selector: (row) => row.employeeDepts[0]?.employeeEdus[1]?.eduName,
    //   sortable: true,
    // },

    // {
    //   name: (
    //     <h5>
    //       <b>Education Qualification-3</b>
    //     </h5>
    //   ),
    //   selector: (row) => row.employeeDepts[0]?.employeeEdus[2]?.eduName,
    //   sortable: true,
    // },

    // {
    //   name: (
    //     <h5>
    //       <b>Salary Allocated</b>
    //     </h5>
    //   ),
    //   selector: (row) =>
    //     row.employeeDepts[0]?.employeeEdus[0]?.employeeSalaries[0]
    //       ?.salaryType ||
    //     row.employeeDepts[0]?.employeeEdus[0]?.employeeSalaries[1]
    //       ?.salaryType ||
    //     row.employeeDepts[0]?.employeeEdus[1]?.employeeSalaries[0]?.salaryType,
    //   //  row.employeeDepts[0]?.employeeEdus[0]?.eduName
    //   sortable: true,
    // },

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
          {/* <button
            onClick={() => navigate(`/editEducation/${row.eduId} `)}
            style={{ border: "none" }}
          >
            <i className="fa-solid fa-pen fa-lg" style={{ color: "blue" }}></i>
          </button> */}
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => blockUser(row.id)}
          >
            {row.Isblocked ? (
              <TiTick size={30} />
            ) : (
              <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
            )}
          </button>

          <button
            style={{ border: "none", background: "none" }}
            onClick={() => handleShow(row.id)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = data.filter((value) => {
      return (
        value.name.toLowerCase().match(search.toLowerCase()) ||
        value.email.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilter(result);
  }, [search]);

  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="Employee Table"
          columns={colunms}
          // data={result ? result : values.data}
          data={filter}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          // onRowClicked={viewIndividualResult}
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
                style={{
                  marginRight: "500px",
                  width: "200px",
                }}
              />
              {/* <Form style={{ float: "left" }}>
                <Form.Label>Apply Filter</Form.Label>
                <Form.Select
                  id="select"
                  name="isBlocked"
                  value={isBlocked}
                  onChange={isBlockDropDown}
                >
                  <option value="">All</option>
                  <option value="1">Blocked</option>
                  <option value="0">Un-Blocked</option>
                </Form.Select>
              </Form> */}
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

export default Employee;
