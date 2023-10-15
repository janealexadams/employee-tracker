// Import and require mysql2 and inquirer
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// View all departments - show formatted table w/ department names and department ids
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM department;`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// View all roles - show role id, role title, the department that role belongs to, and the salary for that role
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM role JOIN department ON role.department_id = department.id`; // need to also show department name
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });


// Read all employees - show formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees;`; // need to also show department and role info
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
// Spin up server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });