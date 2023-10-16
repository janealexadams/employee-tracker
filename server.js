

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
    const sql = `SELECT roles.id, roles.title, roles.salary, department.dept_name AS department FROM roles INNER JOIN department ON department.id = roles.department_id;`; // need to also show department name
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

// View all employees - show formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
app.get('/api/employees', (req, res) => {
    const sql =  "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.dept_name AS department, employees.manager_id " +
    "FROM employees " +
    "JOIN roles ON roles.id = employees.role_id " +
    "JOIN department ON roles.department_id = department.id " +
    "ORDER BY employees.id;"; 
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


