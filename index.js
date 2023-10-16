// Import and require mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    port: 3306,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

  function mainPrompt() {
    inquirer
    .prompt([
      {
          type: 'list',
          message: 'What would you like to do?',
          name: 'mainPrompt',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      if (answers.mainPrompt == "View all departments") {
        viewDepartments()
      }
      if (answers.mainPrompt == "View all roles") {
        viewRoles()
      }
      if (answers.mainPrompt == "View all employees") {
        viewEmployees()
      }
      if (answers.mainPrompt == "Add a role") {
        addRole()
      }

    })
  }

// View all departments - show formatted table w/ department names and department ids
function viewDepartments() {
  const sql = `SELECT * FROM department;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
  });
}

// View all roles - show role id, role title, the department that role belongs to, and the salary for that role
function viewRoles() {
  const sql = `SELECT roles.id, roles.title, roles.salary, department.dept_name AS department FROM roles INNER JOIN department ON department.id = roles.department_id;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
  });
}

// View all employees - show formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
  const sql =  "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.dept_name AS department, employees.manager_id " +
  "FROM employees " +
  "JOIN roles ON roles.id = employees.role_id " +
  "JOIN department ON roles.department_id = department.id " +
  "ORDER BY employees.id;"; 
    db.query(sql, (err, rows) => {
    if (err) {
      res.json({ error: err.message });
       return;
    }
    console.table(rows);
  });
}

  function addDepartment() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department would you like to add?',
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
    })
  }

  async function addRole() {
    const [viewAllDepartments] = await db.promise().query("SELECT * FROM department")
    console.log(viewAllDepartments);
    const departments = viewAllDepartments.map(({id, dept_name}) => ({
      name: dept_name,
      value: id
    }))
    inquirer
    .prompt([
  {
    // WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        type: 'input',
        name: 'addRoleName',
        message: 'What is the name of the role you would like to add?',
    },
    {
    // WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        type: 'input',
        name: 'addRoleSalary',
        message: 'What is the salary of the role you would like to add?',
    },
    {
    // WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
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
      console.log("role added");
    });
  
  })
}


function addEmployee() {
  inquirer
  .prompt([
{
  // WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
      type: 'input',
      name: 'addEmployeeFirstName',
      message: 'Enter the first name of the employee you would like to add.',
  },
  {
  // WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
      type: 'input',
      name: 'addEmployeeLastName',
      message: 'Enter the last name of the employee you would like to add.',
  },
  {
  // WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
      type: 'list',
      name: 'addEmployeeRole',
      message: 'Select the role for employee you would like to add.',
      choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Customer Service'],
  },
 {
  // WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
      type: 'list',
      name: 'addEmployeeManager',
      message: 'Select the manager for employee you would like to add.',
      choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh'],
  },
])
.then((answers) => {
  // Use user feedback for... whatever!!
})
}



function updateEmployee() {
  inquirer
  .prompt([
{
  // WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
      type: 'list',
      name: 'updateEmployeeName',
      message: 'Which employee`s role would you like to update?',
      choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh'],
  },
 {
  // WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
      type: 'list',
      name: 'updateEmployeeRole',
      message: 'Which role do you want to assign the selected employee?',
      choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Customer Service'],
  },
])
.then((answers) => {
  // Use user feedback for... whatever!!
})
}

mainPrompt()