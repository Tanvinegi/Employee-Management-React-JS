import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import Dashboard from "../../pages/Dashboard";
import { Link } from "react-router-dom";
const Table = () => {
  // const [show, setShow] = useState(false);
  // const showAdmin = () => {
  //   setShow(!show);
  //   console.log(show);
  // };
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFiltercountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const colunms = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
      sortable: true,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: "Country Flag",
      selector: (row) => <img alt="" width={50} height={50} src={row.flag} />,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-primary mr-4"
            onClick={() => alert(row.alpha2Code)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => alert(row.name)}>
            Delete
          </button>
        </>
      ),
    },
  ];
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  return (
    <div className="tables">
      <DataTable
        title="Countires list"
        columns={colunms}
        data={filtercountries}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search here"
            className=" form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

      <Tooltip
        title="Add Admin"
        style={{ float: "right" }}
        // onClick={showAdmin() ? <Dashboard /> : "none"}
      >
        <Fab color="primary" aria-label="add">
          {/* <button
            style={{
              border: "none",
              background: "none",
              paddingBottom: "1rem",
            }}
            // onClick={showAdmin}
          >
            <Add fontSize="large" />
          </button> */}
          <Link to="/addAdmin">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Table;
