"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');


  const fetchDataFromServer = async () => {
    try {
      const response = await axios.post('http://localhost/mocktest/backend/mocktest/index.php');
      setData(response.data);
      console.log(response)
      setError('');
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  return (
    <div className=' w-full flex flex-col justify-center items-center p-4 '>
      <h1 className=' font-semibold p-2 '>All Students List</h1>
      {error && <p>Error: {error}</p>}
      <table className=' border w-1/2 '>
        <thead className=' border bg-slate-100 '>
          <tr>
            <th className=' border p-2 '>ID</th>
            <th className=' border p-2 '>Name</th>
            <th className=' border p-2 '>Email Address</th>
          </tr>
        </thead>
        <tbody className=' border '>
          {data && data.map((item) => (
            <tr key={item.id}>
              <td  className=' border p-2 '>{item.id}</td>
              <td  className=' border p-2 '>{item.name}</td>
              <td  className=' border p-2 '>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
