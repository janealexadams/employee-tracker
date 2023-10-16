INSERT INTO departments (dept_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"),
       ("Customer Service");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 80000, 2),
       ("Salesperson", 75000, 2),
       ("Lead Engineer", 200000, 1)
       ("Finance Manager", 150000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 180000, 4),
       ("Customer Service Rep", 100000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 20, 2),
       ("Mike", "Chain", 35, 1),
       ("Ashley", "Rodriguez", 14, 3),
       ("Kevin", "Tupik", 62, 5),
       ("Kunal", "Singh", 24, 4);






-- Departments id's:
-- Sales = 2
-- Engineering = 1
-- Finance = 3
-- Legal = 4
-- Customer Service = 5