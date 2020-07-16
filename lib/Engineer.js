// import employee class
const Employee = require("./Employee.js");

// create engineer class that extends employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        // overrides getRole from employee class
        return "Engineer";
    }
}

// export engineer class
module.exports = Engineer;