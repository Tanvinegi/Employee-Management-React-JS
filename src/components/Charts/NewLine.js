import React ,{useState, useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  } from 'recharts';



 
export default function NewLine() {
    const [data, getData] = useState([]);
    const URL = "https://fakestoreapi.com/products/";

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
    <div className='container  w-25'>
     <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" stackId="a" fill="#8884d8" />
          <Bar dataKey="rating.count" stackId="a" fill="#82ca9d" />
        </BarChart>
    </div>
  );
}
