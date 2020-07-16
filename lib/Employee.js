// create employee class
class Employee {
    // define constructor function
    constructor(name, id, email) {
        // save properties that are passed in
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // define getter functions
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Employee";
    }
}

// export the class
module.exports = Employee;