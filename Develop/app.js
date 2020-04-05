const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

function getTeamInfo(nextRole) {
    inquirer.prompt(questions).then(function (answers) {
        console.log(JSON.stringify(answers, null, '  '));
        if (answers.role !== "Done") { getTeamInfo(answers.role); }
    });
}

const questions = [
    {
        type: "list",
        choices: ["Manager", "Engineer", "Intern", "Done"],
        message: "Select team member role, or 'Done' if entries are complete: ",
        name: "role"
    },
    {
        when: function (answers) { return answers.role !== "Done"; },
        type: "input",
        message: "Employee name: ",
        name: "name"
    },
    // {
    //     when: function (answers) { return answers.role !== "Done"; },
    //     type: "input",
    //     message: "Employee id: ",
    //     name: "id",
    //     validate: function (value) {
    //         var valid = !isNaN(parseInt(value));
    //         return valid || "Please enter a number.";
    //     },
    //     filter: Number
    // },
    // {
    //     when: function (answers) { return answers.role !== "Done"; },
    //     type: "input",
    //     message: "Employee email: ",
    //     name: "email",
    //     validate: function (value) {
    //         return (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null)
    //             ? "Please enter a valid email address" : true;
    //     }
    // },
    // {
    //     when: function (answers) { return answers.role === "Manager"; },
    //     type: "input",
    //     message: "Office number: ",
    //     name: "officeNumber",
    //     validate: function (value) {
    //         var valid = !isNaN(parseInt(value));
    //         return valid || "Please enter a number";
    //     },
    //     filter: Number
    // },
    // {
    //     when: function (answers) { return answers.role === "Engineer"; },
    //     type: "input",
    //     message: "Github username: ",
    //     name: "github"
    // },
    {
        when: function (answers) { return answers.role === "Intern"; },
        type: "input",
        message: "School: ",
        name: "school"
    }
];

getTeamInfo("Manager");