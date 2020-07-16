// import employee class
const Employee = require("./Employee.js");

// create intern class that extends employee class
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        // overrides getRole from employee class
        return "Intern";
    }
}

// export intern class
module.exports = Intern;