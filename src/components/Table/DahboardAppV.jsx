import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";

const AppVersion = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const getAppVersion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/version/list?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppVersion();
  }, []);

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
  ];
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
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="AppVersion"
          columns={colunms}
          data={filtercountries}
          pagination
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

export default AppVersion;
