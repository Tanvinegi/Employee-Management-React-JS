import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};
const Pichart = ({
  pathURL,
  dataKey,
  Activeuser,
  Blocked,
  Total_User,
  Web,
}) => {
  const [data, getData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = () => {
    fetch(pathURL)
      .then((res) => res.json())
      .then((response) => {
        console.log("Dataurl", response);
        getData(response);
      });
  };
  return (
    <>
      <PieChart width={280} height={300}>
        <Pie
          data={data}
          cx="40%"
          cy="40%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey={dataKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="container">
        <div className="row">
          <div className="col d-flex" style={{ gap: "2px" }}>
            <div className="col-1">
              <span>{Activeuser} 200</span>
            </div>
            <div className="col-2">
              <span>{Blocked}1</span>
            </div>
            <div className="col-2">
              <span>{Web}20</span>
            </div>
            <div className="col-2">
              <span>{Total_User}150</span>
            </div>
          </div>
        </div>
        {/* <div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{Activeuser}</li>
            <li className="list-group-item">{Blocked}</li>
            <li className="list-group-item">{Web}</li>

            <li className="list-group-item">{Total_User}</li>
          </ul>
        </div> */}
      </div>
    </>
  );
};
export default Pichart;
