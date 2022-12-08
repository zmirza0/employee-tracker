INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal'),

INSERT INTO role (department_id, title, salary)
VALUES (1, 'Sales Lead', 100000),
       (2, 'Salesperson', 80000),
       (3, 'Lead Engineer', 150000),
       (4, 'Software Engineer', 120000),
       (5, 'Account Manager', 160000),
       (6, 'Accountant', 125000),
       (7, 'Legal Team Lead', 250000),
       (8, 'Lawyer,', 190000);

INSERT INTO employee (role_id, manager_id, first_name, last_name)
VALUES (1, NULL, 'John', 'Doe'),
       (2, 1, 'Mike', 'Chan'),
       (3, NULL, 'Ashley', 'Rodriguez'),
       (4, 3, 'Kevin', 'Tupik'),
       (5, NULL, 'Kunal', 'Singh'),
       (6, 5, 'Malia', 'Brown'),
       (7, NULL, 'Sarah', 'Lourd'),
       (8, 9, 'Tom', 'Allen');