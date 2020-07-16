// import employee class
const Employee = require("./Employee.js");

// create manager class that extends employee class
class Manager extends Employee {
    // define constructor function
    constructor(name, id, email, officeNumber) {
        // run the employee constructor function
        super(name, id, email);
        // add property unique to managers
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        // overrides getRole from employee class
        return "Manager";
    }
}

// export manager class
module.exports = Manager;