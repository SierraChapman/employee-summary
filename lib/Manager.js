// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee.js");

function Manager(name, id, email) {
    Employee.call(this, name, id, email);
}

module.exports = Manager;