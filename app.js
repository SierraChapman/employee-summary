const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Define questions common to all employee types and to each specific type in an object
const questions = {
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
    allEnd: [
        {
            type: "list",
            name: "nextType",
            message: "\nEnter info for an engineer or intern next?",
            choices: ["Engineer", "Intern", "None, I'm all done."]
        }
    ],
    getQuestions: function(employeeType) {
        return [...this.allStart, ...this[employeeType], ...this.allEnd];
    }
}

// console.log(questions.getQuestions("intern"));

// Create empty array of employees
const employees = [];

// Create function to get info
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
            // if adding another employee, call function again
            // else, generate the html file
            if (answers.nextType !== "None, I'm all done.") {
                getEmployeeInfo(answers.nextType.toLowerCase());
            } else {
                // After the user has input all employees desired, call the `render` function (required
                // above) and pass in an array containing all employee objects; the `render` function will
                // generate and return a block of HTML including templated divs for each employee!
                const html = render(employees);
                // console.log(html);

                // After you have your html, you're now ready to create an HTML file using the HTML
                // returned from the `render` function. Now write it to a file named `team.html` in the
                // `output` folder. You can use the variable `outputPath` above target this location.
                // Hint: you may need to check if the `output` folder exists and create it if it
                // does not.
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

// Run the function, starting with manager
console.log("\nWelcome to the team profile generator.\n\nStart by entering the manager's info.");
getEmployeeInfo("manager");

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
