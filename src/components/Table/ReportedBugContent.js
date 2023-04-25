import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
const ReportBugContent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/RepotedBug/list?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const colunms = [
    {
      name: (
        <h6>
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.Id,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Reported By</b>
        </h6>
      ),
      selector: (row) => row.ReportedBy,
      sortable: true,
    },

    {
      name: (
        <h6>
          <b>Status</b>
        </h6>
      ),
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Date</b>
        </h6>
      ),
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Reported Item</b>
        </h6>
      ),
      selector: (row) => row.ReportedItem,
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
            onClick={() => navigate(`/editReportBug/${row.Id}`)}
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
      return country.ReportedBy.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);

  const handleRowClicked = (row) => {
    navigate(`/ReportedBugDetails/${row.Id}`);
  };
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="Reported Bug"
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
      </div>
    </>
  );
};

export default ReportBugContent;
