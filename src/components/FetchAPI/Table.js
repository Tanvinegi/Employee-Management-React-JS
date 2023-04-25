import React from "react";

const Table = ({i, id, title, price, description, image }) => {
    console.log("Table",id)
    console.log("Table 1",price)
  return (
    <div>
        <tr key={i}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{price}</td>
      <td>{description}</td>
      <td>
        <img width={100} height={100} alt="" src={image} />
      </td></tr>
    </div>
  );
};

export default Table;
