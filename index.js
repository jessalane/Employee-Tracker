// requried packages and imported files
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'password',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    init();
})


// arrays of questions
const startOptions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'option',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
}];

const addDept = [{
    type: 'input',
    message: 'What is the name of the department?',
    name: 'dept'
}];

const addRole = [{
    type: 'input',
    message: 'What is the name of the role?',
    name: 'role'
},
{
    type: 'input',
    message: 'What the name of the Department this role is in?',
    name: 'department'
},
{
    type: 'input',
    message: 'What is the salary for this role?',
    name: 'salary'
}
];

const addEmployee = [{
        type: 'input',
        message: 'What the first name of this employee?',
        name: 'empFirst'
    },
    {
        type: 'input',
        message: 'What the last name of this employee?',
        name: 'empLast'
    },
    {
        type: 'input',
        message: 'What is the role ID for this employee?',
        name: 'roleId'
    },
    {
        type: 'input',
        message: 'What is the ID of the manager this employee report to?',
        name: 'manId'
    }
];

// initialize funciton to run the questions
function init() {
    inquirer
        .prompt(startOptions)
        .then(function (answer) {
            switch (answer.option) {
                case 'view all departments':
                    // FUNCTION TO RUN
                    viewDept();
                    break;

                case 'view all roles':
                    // FUNCTION TO RUN
                    viewRoles();
                    break;

                case 'view all employees':
                    // FUNCTION TO RUN
                    viewEmployees();
                    break;

                case 'add a department':
                    // FUNCTION TO RUN
                    createDept();
                    break;

                case 'add a role':
                    // FUNCTION TO RUN
                    createRole();
                    break;

                case 'add an employee':
                    // FUNCTION TO RUN
                    createEmployee();
                    break;

                case 'update an employee role':
                    // FUNCTION TO RUN
                    updateEmployee();
                    break;
            }
        })
}

function viewDept() {
    db.query(`SELECT * FROM departments`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function viewRoles() {
    db.query(`SELECT * FROM roles`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function viewEmployees() {
    db.query(`SELECT * FROM employees`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function createDept() {
    inquirer
        .prompt(addDept)
        .then((answer) => {
            // setting parameters var
            const sqlParams = JSON.stringify(answer.dept);

            // running the sql query
            db.query(`INSERT INTO departments (deptName) VALUES (` + sqlParams + `);`, function (err, results) {
                if (err) throw err;
                console.log('added successfully!');
                init();
            });
        })
}

function createRole() {
    inquirer
        .prompt(addRole)
        .then((answer) => {
            // setting parameters var
            const roleParams = [answer.role, answer.department, answer.salary];
            const roleString = JSON.stringify(roleParams).replace(/]|[[]/g, '');

            // insert data into roles table
            db.query(`INSERT INTO roles (title, dept, salary) VALUES (` + roleString + `)`, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added successfully!");
                    init();
                }
            });
        })
}

function createEmployee() {
    inquirer
        .prompt(addEmployee)
        .then((answer) => {
            // setting parameters var
            const empParams = [answer.empFirst, answer.empLast, answer.roleId, answer.manId];
            const empString = JSON.stringify(empParams).replace(/]|[[]/g, '');

            // insert data into roles table
            db.query(`INSERT INTO employees (firstName, lastName, title, managerId) VALUES (` + empString + `);`, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added successfully!");
                    init();
                }
            });
        })
}

function updateEmployee() {
    try {
        inquirer.prompt(addDept)
            .then((answer) => {
                // then what? update role?
            })
    } catch (err) {
        console.log(err);
    }
}