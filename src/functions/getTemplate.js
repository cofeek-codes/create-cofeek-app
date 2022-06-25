import inquirer from 'inquirer'

async function getTemplate() {
	const template = await inquirer.prompt({
		name: 'project_template',
		type: 'list',
		choices: ['gulp', 'basic'],
		message: 'whitch type of project do you want to create?',
		default() {
			return 'gulp'
		},
	})
	return template.project_template
}

export default getTemplate
