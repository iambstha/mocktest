"use client"
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');


  const fetchDataFromServer = async () => {
    try {
      const response = await axios.post('http://localhost/mocktest/backend/mocktest/index.php');
      setData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setError('An error occurred while fetching data.');
    }
  };

  fetchDataFromServer()

  return (
    <div>
      <h1>App</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
