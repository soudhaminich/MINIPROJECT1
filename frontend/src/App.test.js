import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import custom CSS file

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, email, password, balance };
    axios.post('http://localhost:5000/register', userData)
      .then((response) => {
        console.log(response.data);
        setMessage(`Created the user "${username}" successfully 
         Balance is ₹${balance}`);
        // Clear the form after successful registration
        setUsername('');
        setEmail('');
        setPassword('');
        setBalance('');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setMessage('Error occured..... Please try again.');
      });
  };

  return (
    <div className="center-container"> {/* Apply CSS class to center the form */}
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>e₹ Balance:</label>
          <input type="number" value={balance} onChange={handleBalanceChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
