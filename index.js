// Import and require mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to company_db w/ my mysql username and password
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Main prompt to select view or task
  function mainPrompt() {
    inquirer
    // WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    .prompt([
      {
          type: 'list',
          message: 'What would you like to do?',
          name: 'mainPrompt',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
      },
    ])
    .then((answers) => {
      // Navigates to corresponding view or task depending on user's selection 
      if (answers.mainPrompt == "View all departments") {
        viewDepartments()
      }
      if (answers.mainPrompt == "View all roles") {
        viewRoles()
      }
      if (answers.mainPrompt == "View all employees") {
        viewEmployees()
      }
      if (answers.mainPrompt == "Add a department") {
        addDepartment()
      }
      if (answers.mainPrompt == "Add a role") {
        addRole()
      }
      if (answers.mainPrompt == "Add an employee") {
        addEmployee()
      }
      if (answers.mainPrompt == "Update an employee role") {
        updateEmployeeRole()
      }
    })
  }

// View all departments - show formatted table w/ department names and department ids
function viewDepartments() {
  const sql = `SELECT * FROM departments;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
    mainPrompt()
  });
}

// View all roles - show role id, role title, the department that role belongs to, and the salary for that role
function viewRoles() {
  const sql = `SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department FROM roles INNER JOIN departments ON departments.id = roles.departments_id;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
    mainPrompt()
  });
}

// View all employees - show formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
  const sql =  "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS departments, employees.manager_id FROM employees JOIN roles ON roles.id = employees.role_id JOIN departments ON roles.departments_id = departments.id ORDER BY employees.id;"; 
    db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
    mainPrompt()
  });
}

// Add department - prompt user to enter the name of the department and that department is added to the database
function addDepartment() {
  inquirer
  // WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
  .prompt([
     {
       type: 'input',
       name: 'addDepartment',
      message: 'What is the name of the department would you like to add?',
     },
  ])
  .then((answers) => {
    console.log(answers)
    const departmentInfo = [answers.addDepartment]
    db.query("INSERT INTO department(dept_name) VALUES(?)", departmentInfo, (err, rows) => {
      if (err) {
        console.error({ error: err.message });
         return;
      }
      console.log("Department added to database.");
      mainPrompt()
    });
  })
}

// Add role to the database - prompt user to enter the name, salary, and department for the role and that role is added to the database
async function addRole() {
  const [viewAllDepartments] = await db.promise().query("SELECT * FROM departments")
  console.log(viewAllDepartments);
  const departments = viewAllDepartments.map(({id, dept_name}) => ({
    name: dept_name,
    value: id
  }))
  inquirer
  // WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
  .prompt([
    {
        type: 'input',
        name: 'addRoleName',
        message: 'What is the name of the role you would like to add?',
    },
    {
        type: 'input',
        name: 'addRoleSalary',
        message: 'What is the salary of the role you would like to add?',
    },
    {
        type: 'list',
        name: 'addRoleDepartment',
        message: 'What department does the role belong to?',
        choices: departments,
    },
])
.then((answers) => {
  console.log(answers)
  const roleInfo = [answers.addRoleName, answers.addRoleSalary, answers.addRoleDepartment]
  db.query("INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)", roleInfo, (err, rows) => {
    if (err) {
      console.error({ error: err.message });
       return;
    }
    console.log("Role added.");
    mainPrompt()
  });
})
}

// Add employee to database - prompt user to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name you would like to add?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name you would like to add?",
    },
  ]).then((answer) => {
    const names = [answer.firstName, answer.lastName];
    const roleSql = `SELECT roles.id, roles.title FROM roles`;
    db.query(roleSql, (error, data) => {
      if (error) throw error;
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));
      inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: roles,
        },
      ]).then((chooseRole) => {
        const role = chooseRole.role;
        names.push(role);
        const managerSql = `SELECT * FROM employees`;
        db.query(managerSql, (error, data) => {
          if (error) throw error;
          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id,
          }));
          inquirer
          .prompt([
            {
              type: "list",
              name: "manager",
              message: "Who is the manager of the employee?",
              choices: managers,
            },
          ]).then((managerChoice) => {
            const manager = managerChoice.manager;
            names.push(manager);
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(sql, names, (error) => {
              if (error) throw error;
              console.log("Employee added to database.");
              mainPrompt()
            });
          });
        });
      });
    });
  });
};

// Update existing employee in database - prompt user to select an employee to update and their new role and this information is updated in the database
function updateEmployeeRole() {
  inquirer.prompt([
      {
          name: "first_name",
          type: "input",
          message: "What is the first name of the employee you would like to update?"
      },
      {
          name: "role_id",
          type: "number",
          message: "What is the role number id of the employee you would like to update?"
      }
  ]).then(function (response) {
      db.query("UPDATE employees SET role_id = ? WHERE first_name = ?", [response.role_id, response.first_name], function (err, data) {
          if (err) throw err;
          console.log('The role has been updated in the database.');
          mainPrompt()
      })
});
};

// Calling mainPrompt function
mainPrompt()


