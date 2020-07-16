// Import classes and libraries
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Create questions object to store questions and construct question sets
const questions = {
    // Questions common to all employee types, asked at beginning
    allStart: [
        {
            type: "input",
            name: "name",
            message: "Name:"
        },
        {
            type: "input",
            name: "id",
            message: "ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Email:"
        }
    ],
    // Questions for specific employee types
    manager: [
        {
            type: "input",
            name: "officeNumber",
            message: "Office number:"
        }
    ],
    engineer: [
        {
            type: "input",
            name: "github",
            message: "GitHub username:"
        }
    ],
    intern: [
        {
            type: "input",
            name: "school",
            message: "School:"
        }
    ],
    // Questions common to all employee types, asked at end
    allEnd: [
        {
            type: "list",
            name: "nextType",
            message: "\nEnter info for an engineer or intern next?",
            choices: ["Engineer", "Intern", "None, I'm all done."]
        }
    ],
    // Function to construct question set
    getQuestions: function(employeeType) {
        return [...this.allStart, ...this[employeeType], ...this.allEnd];
    }
}

// console.log(questions.getQuestions("intern"));

// Create empty array to store employees as we get information
const employees = [];

// Create function to prompt for employee info from user and create employee
function getEmployeeInfo(employeeType) {
    // ask questions
    inquirer
        .prompt(questions.getQuestions(employeeType))
        .then(answers => {
            // push new employee object to array
            switch (employeeType) {
                case "manager":
                    employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber));
                    break;
                case "engineer":
                    employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
                    break;
                case "intern":
                    employees.push(new Intern(answers.name, answers.id, answers.email, answers.school));
                    break;
                default:
                    throw new Error("attemtping to add unknown employee type");
            }
            if (answers.nextType !== "None, I'm all done.") {
                // if adding another employee, call function to get info for next employee
                getEmployeeInfo(answers.nextType.toLowerCase());
            } else {
                // if done adding employees, generate html string
                const html = render(employees);

                // console.log(html);

                // save html file
                fs.writeFile(outputPath, html, "utf8", (err) => {
                    if (err) throw err;
                    console.log('\nThe HTML file has been saved in the output folder.\n');
                });
            }
        })
        .catch(error => {
            throw error;
        })
}

// Run the function to get employee info, starting with manager
console.log("\nWelcome to the team profile generator.\n\nStart by entering the manager's info.");
getEmployeeInfo("manager");