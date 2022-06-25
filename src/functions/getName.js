import inquirer from 'inquirer'

async function getProjectName() {
	const name = await inquirer.prompt({
		name: 'project_name',
		type: 'input',
		message: 'project name?',
		default() {
			return 'my-app'
		},
	})
	return name.project_name
}

export default getProjectName
