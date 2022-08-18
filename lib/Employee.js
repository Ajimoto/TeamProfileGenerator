// TODO: Write code to define and export the Employee class
class Employee {
	constructor(name, id, email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	getId() {
		console.log(this.id);
		return this.id;
	}
	getName() {
		console.log(this.name);
		return this.name;
	}

	getEmail() {
		console.log(this.email);
		return this.email;
	}

	getRole() {
		console.log('Employee!');
		return 'Employee';
	}
}

module.exports = Employee;
