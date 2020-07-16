# Team Profile Generator

## Description

This application uses a command line interface to allow the user to input information about team members and then generates an HTML file that renders a simple webpage to display the information about the team. I implemented the command line interface, the employee class and subclasses, and the code to create instances of the classes based on user input. The HTML templates and the function to generate the HTML (with small changes to both) as well as the test scripts were provided by Trinity Education Services.

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [Demonstration](#demonstration)

* [Code Snippets](#code-snippets)

* [Built With](#built-with)

* [Tests](#tests)

* [Questions](#questions)

* [Acknowledgements](#acknowledgements)

## Installation

After downloading this repository, run the following command inside the repository to install the necessary dependencies:

```
npm ci
```

## Usage

Start the application with the command `node app.js`. You will be prompted with a series of questions about the employees. You can enter information about one manager and any number of engineers or interns. Once you indicate that you are done adding employees, the HTML file for the generated webpage will be saved in the output folder. The image below is an example of a generated webpage.

![Example output webpage](./team-profile-screenshot.png)

## Demonstration

* [Video demonstrating use of the application](https://drive.google.com/file/d/1kY2aX0YZOqD-7r5nQfBcMkojHVOxPS-S/view?usp=sharing)

## Code Snippets

The command line interface asks a series of questions that depends on the type of employee selected and that repeats as long as the user indicates they want to add another employee. This is accomplished using a recursive function. The function takes in the employee type and uses inquirer's prompt method to ask some questions, the last of which being what type of employee (if any) to add next. If the user selects an employee type, the function is called again with the new employee type, and if not, the HTML file is generated and saved. The recursive logic in the function is shown in the code snippet below. Other parts of the function were edited or removed (as indicated in the comments) to reduce the size of the snippets.

```javascript
// Create function to prompt for employee info from user and create employee
function getEmployeeInfo(employeeType) {
    // ask questions
    inquirer
        .prompt(questions.getQuestions(employeeType))
        .then(answers => {

            // REMOVED: switch statment to create object representing employee and pushing it to employee array
            
            if (answers.nextType !== "None, I'm all done.") {
                // if adding another employee, call function to get info for next employee
                getEmployeeInfo(answers.nextType.toLowerCase());
            } else {
                // if done adding employees, generate html string
                const html = render(employees);
                // save html file
                fs.writeFile(outputPath, html, "utf8", (err) => {
                    if (err) throw err;
                    console.log('\nThe HTML file has been saved in the output folder.\n');
                });
            }
        })
        .catch(error => {throw error;})
}
```

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Font Awesome](https://fontawesome.com/)
* [Bootstrap](https://getbootstrap.com/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/)
* [Inquirer](https://www.npmjs.com/package/inquirer)


## Tests

To run tests, run the following command:

```
npm test
```

## Questions

If you have any questions about the repo, open an issue or contact me directly at siechap@gmail.com. You can find more of my work at [SierraChapman](https://github.com/SierraChapman/).

## Acknowledgments

* The HTML templates and the function to generate the HTML (with minor changes to both) as well as the test scripts were provided by Trinity Education Services, a 2U, Inc.