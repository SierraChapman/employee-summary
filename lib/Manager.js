// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee.js");

function Manager(name, id, email, officeNumber) {
    Employee.call(this, name, id, email);
    this.officeNumber = officeNumber;
    this.getOfficeNumber = function() {
        return this.officeNumber;
    };
    this.getRole = function() {
        return "Manager";
    };
}

module.exports = Manager;