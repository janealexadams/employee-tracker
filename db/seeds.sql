INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 2),
       ("Salesperson", 75000, 2),
       ("Lead Engineer", 200000, 1)
       ("Account Manager", 150000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 2),
       ("Mike", "Chain", 3, 1),
       ("Ashley", "Rodriguez", 5, 3),
       ("Kevin", "Tupik", 4, 4),
       ("Kunal", "Singh", 2, 5);
