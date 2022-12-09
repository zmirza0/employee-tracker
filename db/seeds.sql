INSERT INTO departments(name)
    VALUES  ("Engineering"),
            ("Finance"),
            ("Legal"),
            ("Sales");

INSERT INTO roles(title, salary, departments_id)
    VALUES  ("Sales Lead", 100000, 4),
            ("Salesperson", 100000, 4),
            ("Lead Engineer", 120000, 1),
            ("Software Engineer", 110000, 1),
            ("Account Manager", 100000, 2),
            ("Accountant", 90000, 3),
            ("Legal Team Lead", 200000, 3),
            ("Lawyer", 100000, 3);

INSERT INTO employees(first_name, last_name, roles_id, manager_id)
    VALUES  ("Jose", "Brown", 1, NULL),
            ("Dan", "Smith", 2, 1),
            ("Jess", "Jones", 2, 1),
            ("Mike", "Jack", 3, NULL),
            ("Hailey", "Len", 4, NULL),
            ("Godwin", "Santos", 5, 5),
            ("Rose", "Johnson", 5, 5),
            ("Jane", "Doe", 6, NULL),
            ("Daniella", "Garcia", 7, 8),
            ("Emma", "Watson", 7, 8);