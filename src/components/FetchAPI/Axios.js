import React, { useState, useEffect } from "react";
import _ from "lodash";

const pageSize = 3;

const Axios = ({ pathURL, h1, h2, h3, h4, h5, h6 }) => {
  const [data, getData] = useState([]);
  const [paginatedPosts, setpaginationPosts] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  console.log(URL);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(pathURL)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);
        getData(response);
        setpaginationPosts(_(response).slice(0).take(pageSize).value());
      });
  };
  const pageCount = data ? Math.ceil(data.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  const pagination = (pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPosts = _(data).slice(startIndex).take(pageSize).value();
    setpaginationPosts(paginatedPosts);
    console.log(paginatedPosts);
  };
  return (
    <>
      <div className="container w-75 mt-5">
        <table className="table table-striped shadow-lg p-3 mb-5 bg-body rounded ">
          <tbody>
            <tr>
              <th>{h1}</th>
              <th>{h2}</th>
              <th>{h3}</th>
              <th>{h4}</th>
              <th>{h5}</th>
              <th>{h6}</th>
            </tr>
            {paginatedPosts.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img width={30} height={30} alt="" src={item.image} />
                </td>
                <td>{item.category}</td>
                {/* <td><Table i={i} id={item.id} title={item.title} price={item.price} /></td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {pages.map((page) => (
              <li className={page === currentPage ? "page-item " : "page-item"}>
                <p className="page-link" onClick={() => pagination(page)}>
                  {page}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Axios;
