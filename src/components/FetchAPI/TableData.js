import React, { useState, useEffect } from "react";

function TableData() {
  const [data, getData] = useState([]);
  const URL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);
        getData(response);
      });
  };

  return (
    <div className="container">
      <table className="table table-striped "variant="dark">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address.street} {item.address.suite} {item.address.city} {item.address.zipcode} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
