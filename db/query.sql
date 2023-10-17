-- db.query for each function

-- NEED TO MAKE
viewEmployees() - show formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    `SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS departments, employees.manager_id FROM employees JOIN roles ON roles.id = employees.role_id JOIN departments ON roles.department_id = departments.id ORDER BY employees.id;`

    should look like this screenshot: Screen Shot 2023-10-16 at 1.32.35 PM.png

addEmployee() - user enters the employee’s first name, last name, role, and manager, and that employee is added to the database
    `INSERT INTO employees(first_name, last_name, title, *manager name*) VALUES(?,?,?,?)`

updateEmployee() - when the user updates the employee role and selects the employee to update, then their new role is updated in the database
    `UPDATE employees SET role_id = ? WHERE id = ? VALUES(?,?)`


-- DONE
viewDepartments() - show formatted table w/ department names and department ids
    `SELECT * FROM department;`

viewRoles() - show role id, role title, the department that role belongs to, and the salary for that role
    `SELECT roles.id, roles.title, roles.salary, department.dept_name AS department FROM roles INNER JOIN department ON department.id = roles.department_id;`

addDepartment() - user enters the name of the department and that department is added to the database
    `INSERT INTO department(dept_name) VALUES(?)`

addRole() - user enters the name, salary, and department for the role and that role is added to the database
    `INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)`