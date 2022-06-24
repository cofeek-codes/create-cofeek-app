#!/usr/bin/env node
import { execSync } from 'child_process'
import { program } from 'commander'
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'

// vars

var projectData = {
	name: '',
	isGit: false,
}

async function getProjectName() {
	const name = await inquirer.prompt({
		name: 'project_name',
		type: 'input',
		message: 'project name?',
		default() {
			return 'my-app'
		},
	})
	projectData.name = name.project_name
}

await getProjectName()

console.log(projectData.name)
