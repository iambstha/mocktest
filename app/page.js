"use client"
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost/mocktest/backend/insertDataToDatabase.php', {
        name: name,
        username: username,
        password: password,
      },{
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      });

      // Clear the input fields
      setName('');
      setUsername('');
      setPassword('');

      // Fetch the updated data from the server after successful insertion
      fetchDataFromServer();
    } catch (error) {
      console.error('Error adding data to the server:', error);
      setError('An error occurred while adding data.');
    }
  };

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.post('http://localhost/mocktest/backend/index.php');
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
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={handleInputChange} />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Data</button>
      </form>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
