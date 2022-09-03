// requried packages and imported files
const inquirer = require('inquirer');
const sequelize = require('./config/connection.js');

// arrays of questions
const startOptions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'option',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee']
}, ];

const addDept = [{
    type: 'list',
    message: 'What is the name of the department?',
    name: 'dept'
}, ];

const addRole = [{
        type: 'list',
        message: 'What is the name of the role?',
        name: 'role'
    },
    {
        type: 'input',
        message: 'What the name of the Department this role is in?',
        name: 'department'
    }, ,
    {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'salary'
    },
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
        message: 'What is the role for this employee?',
        name: 'empRole'
    },
    {
        type: 'input',
        message: 'What manager does this employee report to?',
        name: 'manName'
    },
];

// initialize funciton to run the questions
function init() {
    try {
        inquirer.prompt(startOptions)
            .then((answer) => {
                if (answer.option == "view all departments") {
                    // show departments table
                    sequelize.query('SELECT * FROM departments', function (err, results) {
                        console.log(results);
                    });
                }
                if (answer.option == "view all roles") {
                    // show roles table
                    sequelize.query('SELECT * FROM roles', function (err, results) {
                        console.log(results);
                    });
                }
                if (answer.option == "view all employees") {
                    // show employees table
                    sequelize.query('SELECT * FROM tables', function (err, results) {
                        console.log(results);
                    });
                }
                if (answer.option == "add a department") {
                    createDept();
                }
                if (answer.option == "add a role") {
                    createRole();
                }
                if (answer.option == "add an employee") {
                    createEmployee();
                }
                if (answer.option == "update an employee") {
                    updateEmployee();
                }
            })
    } catch (err) {
        console.log(err);
    }
}

function createDept() {
    try {
        inquirer.prompt(addDept)
            .then((answer) => {
                // insert data into departments table
                sequelize.query('INSERT INTO departments (deptName) values (' + answer.dept + ')', function (err, results) {
                    console.log(results);
                });

                init();
            })
    } catch (err) {
        console.log(err);
    }
}

function createRole() {
    try {
        inquirer.prompt(addRole)
            .then((answer) => {
                // insert data into roles table
                sequelize.query('INSERT INTO roles (title, department, salary) values (' + answer.role + answer.department + answer.salary + ')', function (err, results) {
                    console.log(results);
                });

                init();
            })
    } catch (err) {
        console.log(err);
    }
}

function createEmployee() {
    try {
        inquirer.prompt(addEmployee)
            .then((answer) => {
                // insert data into roles table
                sequelize.query('INSERT INTO employees (firstName, lastName, title, manager) values (' + answer.empFirst + answer.empLast + answer.empRole + answer.manName + ')', function (err, results) {
                    sequelize.query('INSERT INTO employees (`dept`,`salary`) SELECT `dept`,`salary` FROM roles WHERE `roles.title`= `employess.title`', function (err, results) {
                        console.log(results);
                    });
                });

                init();
            })
    } catch (err) {
        console.log(err);
    }
}

function updateEmployee() {
    try {
        inquirer.prompt(addDept)
            .then((answer) => {
                // then what?
            })
    } catch (err) {
        console.log(err);
    }
}

// calling init function
init();