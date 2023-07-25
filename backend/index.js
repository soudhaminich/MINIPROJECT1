// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mini123',
  port: 5432,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    done();
  }
});

app.post('/register', (req, res) => {
  const { username, email, password, balance } = req.body;

  // Check if the username or email already exists in the database (optional)

  const sql = 'INSERT INTO users (username, email, password, balance) VALUES ($1, $2, $3, $4)';
  pool.query(sql, [username, email, password, balance], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});