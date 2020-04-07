const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let employeeArr = [];

function getTeamInfo() {
    inquirer.prompt(questions).then(function (answers) {

        // add newest employee to array
        employeeArr.push(createEmployeeRecord(answers));

        if (answers.addAnother) {
            getTeamInfo(answers.role);
        } else {
            createTeamPage();
        }
    });
}

function createEmployeeRecord(answers) {
    // make the appropriate employee type based on user answers
    if (answers.role === "Manager") {
        return new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        // employeeArr.push(newEmployee);
    } else if (answers.role === "Engineer") {
        return new Engineer(answers.name, answers.id, answers.email, answers.github);
        // employeeArr.push(newEmployee);
    } else if (answers.role === "Intern") {
        return new Intern(answers.name, answers.id, answers.email, answers.school);
        // employeeArr.push(newEmployee);
    }
}

function createTeamPage() {
    // use employee array to build web page
    const html = render(employeeArr);

    // write templates/team.html
    fs.writeFile("templates/team.html", html, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

// question array
const questions = [
    {
        type: "list",
        choices: ["Manager", "Engineer", "Intern"],
        message: "Select team member role: ",
        name: "role"
    },
    {
        when: function (answers) { return answers.role !== "Done"; },
        type: "input",
        message: "Employee name: ",
        name: "name"
    },
    {
        when: function (answers) { return answers.role !== "Done"; },
        type: "input",
        message: "Employee ID: ",
        name: "id",
        // filter: Number,
        validate: function (value) {
            const regExp = /^\d+$/;
            if (regExp.test(value)) {
                return true;
            } else {
                return "" || "Employee ID should be a number!";
            }
            // const isValid = regExp.test(value) === NaN ? false : true;
            // return isValid || "Employee ID should be a number!";
        }
    },
    {
        when: function (answers) { return answers.role !== "Done"; },
        type: "input",
        message: "Employee email: ",
        name: "email",
        validate: function (value) {
            return (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null)
                ? "Please enter a valid email address" : true;
        }
    },
    {
        when: function (answers) { return answers.role === "Manager"; },
        type: "input",
        message: "Office Number: ",
        name: "officeNumber",
        validate: function (value) {
            var regExp = /^\d+$/;
            return regExp.test(value) || "Office Number should be a number!";
        }
    },
    {
        when: function (answers) { return answers.role === "Engineer"; },
        type: "input",
        message: "Github username: ",
        name: "github"
    },
    {
        when: function (answers) { return answers.role === "Intern"; },
        type: "input",
        message: "School: ",
        name: "school"
    },
    {
        type: "confirm",
        message: "Do you have another employee to enter?",
        name: "addAnother"
    }
];

getTeamInfo();