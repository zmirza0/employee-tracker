const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'EIn224!',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'initial',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ]
            }
        ]).then(ans => {
            switch (ans.initial) {
                    case 'View All Employees': viewEmployees();
                        break;
                    case 'Add Employee': addEmployee();
                        break;
                    case 'View All Roles': viewRoles();
                        break;
                    case 'Add Role': addRole();
                        break;
                    case 'View All Departments': viewDepartment();
                        break;
                    case 'Add Department': addDepartment();
                        break;
                    case 'Quit':
                        console.log('Thank you very much!');
                        process.exit();
                 }
                 }).catch(err => console.error(err));
            }

init();

const viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
}


const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

const viewDepartment = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};


const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName'
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName'
            }

        ]).then(ans => {
            db.query(`INSERT INTO employees(first_name, last_name)
                    VALUES(?, ?)`, [ans.firstName, ans.lastName], (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM employees`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        init();
                    })
                }
            }
            )
        })
}

const addRole = () => {
    const departmentChoices = () => db.promise().query(`SELECT * FROM department`)
        .then((rows) => {
            let arrNames = rows[0].map(obj => obj.name);
            return arrNames
        })
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                name: 'addDepartment',
                choices: departmentChoices
            }
        ]).then(ans => {
            db.promise().query(`SELECT id FROM department WHERE name = ?`, ans.addDepartment)
                .then(answer => {
                    let mappedId = answer[0].map(obj => obj.id);
                    return mappedId[0]
                })
                .then((mappedId) => {
                    db.promise().query(`INSERT INTO roles(title, salary, department_id)
                VALUES(?, ?, ?)`, [ans.roleTitle, ans.roleSalary, mappedId]);
                    init()
                })
        })
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'addDepartment'
            }
        ]).then(ans => {
            db.query(`INSERT INTO department(name)
                    VALUES(?)`, ans.addDepartment, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM department`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        init();
                    })
                }
            }
            )
        })
};
