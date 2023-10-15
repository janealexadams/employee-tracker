const inquirer = require('inquirer');
const fs = require("fs");

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'mainOption',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
    {
    // WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department would you like to add?',
    },
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
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Customer Service'],
    },
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
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });