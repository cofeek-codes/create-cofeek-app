import inquirer from 'inquirer'

async function getIsGit() {
	const isGit = await inquirer.prompt({
		name: 'is_git',
		type: 'confirm',
		message: 'do you want to use Git?',
		default() {
			return false
		},
	})

	return isGit.is_git
}

export default getIsGit
