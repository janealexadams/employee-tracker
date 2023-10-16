// FUNCTIONS I STILL NEED TO ADD:
// function viewEmployees() - show employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// function addEmployee() - prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// updateEmployee() - select an employee to update and their new role and this information is updated in the database





// import and require mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

// connect to company_db w/ my mysql username and password
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

// main prompt to select view or task
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
      // navigates to corresponding view or task depending on user's selection 
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
        updateEmployee()
      }
    })
  }

// view all departments - show formatted table w/ department names and department ids
function viewDepartments() {
  const sql = `SELECT * FROM departments;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
  });
}

// view all roles - show role id, role title, the department that role belongs to, and the salary for that role
function viewRoles() {
  const sql = `SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department FROM roles INNER JOIN departments ON departments.id = roles.departments_id;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
  });
}

// i can't figure out how to join/view this table properly
// view all employees - show formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
  const sql =  "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS departments, employees.manager_id FROM employees JOIN roles ON roles.id = employees.role_id JOIN departments ON roles.departments_id = departments.id ORDER BY employees.id;"; 
    db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
  });
}

// add department - prompt user to enter the name of the department and that department is added to the database
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
    });
  })
}

// add a role - prompt user to enter the name, salary, and department for the role and that role is added to the database
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
  });
})
}


// make variable for manager's name choices combining first and last name
// need to insert manager's name for db.query 
async function addEmployee() {
  const [viewAllDepartments] = await db.promise().query("SELECT * FROM departments")
  const departments = viewAllDepartments.map(({id, dept_name}) => ({
    name: dept_name,
    value: id
  }))
  const managerNames = 
  // WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  .prompt([
    {
        type: 'input',
        name: 'addEmployeeFirstName',
        message: 'Enter the first name of the employee you would like to add.',
    },
    {
        type: 'input',
        name: 'addEmployeeLastName',
        message: 'Enter the last name of the employee you would like to add.',
    },
    {
        type: 'list',
        name: 'addEmployeeRole',
        message: 'Select the role for employee you would like to add.',
        choices: departments,
    },
    {
        type: 'list',
        name: 'addEmployeeManager',
        message: 'Select the manager for employee you would like to add.',
        choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh'], // this should be managerNames
    },
])
.then((answers) => {
  console.log(answers)
  const employeeInfo = [answers.addEmployeeFirstName, answers.addEmployeeLastName, answers.addEmployeeRole, answers.addEmployeeManager]
  db.query("INSERT INTO employees(first_name, last_name, title, *manager name*) VALUES(?,?,?,?)", employeeInfo, (err, rows) => {
    if (err) {
      console.error({ error: err.message });
       return;
    }
    console.log("Employee added to database.");
  });
})
}


// also need to make a table combining first and last name for updateEmployeeName
async function updateEmployee() {
  const [viewAllRoles] = await db.promise().query("SELECT * FROM roles")
  const roles = viewAllRoles.map(({id, title, salary, department_id}) => ({
    name: dept_name,
    value: id,
    amount: salary,
    value: department_id
  }))
  inquirer
  // WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
  .prompt([
  {
        type: 'list',
        name: 'updateEmployeeName',
        message: 'Which employee`s role would you like to update?',
        choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh'],
    },
  {
        type: 'list',
        name: 'updateEmployeeRole',
        message: 'Which role do you want to assign the selected employee?',
        choices: roles,
    },
])
.then((answers) => {
  const updatedEmployeeInfo = [answers.updateEmployeeName, answers.updateEmployeeRole]
  db.query("UPDATE employees SET role_id = ? WHERE id = ? VALUES(?,?)", updatedEmployeeInfo, (err, rows) => {
    if (err) {
      console.error({ error: err.message });
       return;
    }
    console.log("Employee updated in database.");
  });
})
}

// calling mainPrompt function
mainPrompt()


