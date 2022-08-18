const inquirer = require('inquirer');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const Manager = require('../lib/Manager');
const generateHtml = require('../util/generateHtml');
const fs = require('fs');
//empty array to store the team into
const team = [];
//starts the application, add new manager
const start = async () => {
	const managerRes = await managerQs();
	const manager = new Manager(
		managerRes.teamManager,
		managerRes.manEmpID,
		managerRes.manEmail,
		managerRes.manOfficeNum
	);
	team.push(manager);
	console.log(team);
	addTeamMembers();
};
// after manager is added. employees can be created and assigned. either engineer or intern
async function addTeamMembers() {
	const newMemberChoice = await employeeType();
	console.log(newMemberChoice);
	if (newMemberChoice === 'Intern') {
		const newMem = await internQs();
		const intern = new Intern(
			newMem.internName,
			newMem.internID,
			newMem.internEmail,
			newMem.internSchool
		);
		team.push(intern);
		console.log(team);
	} else if (newMemberChoice === 'Engineer') {
		const newMem = await engineerQs();
		const engineer = new Engineer(
			newMem.enginName,
			newMem.enginID,
			newMem.enginEmail,
			newMem.enginGitHub
		);
		team.push(engineer);
		console.log(team);
	} else {
		console.log('Later bro!');
		return;
	}
	// gives option to add another employee or finish and create the HTML
	newOrSendit();
}
// function for the manager information. called in 'start' function
async function managerQs() {
	const managerQ = await inquirer.prompt([
		{
			type: 'input',
			name: 'teamManager',
			message: 'Please enter Team Manager name',
		},
		{
			type: 'number',
			name: 'manEmpID',
			message: 'please enter Team Manager employee id',
		},
		{
			type: 'input',
			name: 'manEmail',
			message: 'Please enter Team Manager email address',
		},
		{
			type: 'input',
			name: 'manOfficeNum',
			message: 'Please enter Team Manager Office Number',
		},
	]);
	return managerQ;
}
//promp to choose if employee is engineer or intern.
async function employeeType() {
	const enginInt = await inquirer.prompt([
		{
			type: 'list',
			name: 'memChoice',
			message: 'Add an engineer or intern',
			choices: ['Intern', 'Engineer', 'Quit'],
		},
	]);
	return enginInt.memChoice;
}
// questions if engineer is selected
async function engineerQs() {
	const enginResp = await inquirer.prompt([
		{
			type: 'input',
			name: 'enginName',
			message: 'Please enter Engineer name',
		},
		{
			type: 'number',
			name: 'enginID',
			message: 'Please enter Engineer employee id',
		},
		{
			type: 'input',
			name: 'enginEmail',
			message: 'Please enter Engineer email address',
		},
		{
			type: 'input',
			name: 'enginGitHub',
			message: 'Please enter Engineer GitHub',
		},
	]);
	return enginResp;
}
//questions in intern is selected
async function internQs() {
	const internRes = await inquirer.prompt([
		{
			type: 'input',
			name: 'internName',
			message: 'Please enter intern name',
		},
		{
			type: 'number',
			name: 'internID',
			message: 'Please enter intern employee id',
		},
		{
			type: 'input',
			name: 'internEmail',
			message: 'Please enter intern email address',
		},
		{
			type: 'input',
			name: 'internSchool',
			message: 'Please enter intern School',
		},
	]);
	return internRes;
}

async function newOrSendit() {
	const newOrHTML = await inquirer.prompt([
		{
			type: 'list',
			name: 'addOrMakeHTML',
			message: 'Add Members or Make HTML',
			choices: ['Add', 'Make HTML'],
		},
	]);
	if (newOrHTML.addOrMakeHTML === 'Add') {
		addTeamMembers();
	} else if (newOrHTML.addOrMakeHTML === 'Make HTML') {
		const html = generateHtml(team);

		fs.writeFile('../assets/index.html', html, (err) => {
			if (err) {
				console.log(err);
			}
		});
	}
}

start();
