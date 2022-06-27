#!/usr/bin/env node
import { execSync } from 'child_process'
import consola from 'consola'
import fs from 'fs'
import ora from 'ora'
import getProjectName from '../src/functions/getName.js'
import getIsGit from '../src/functions/getIsGit.js'
import getTemplate from '../src/functions/getTemplate.js'

// vars

var projectData = {
	name: '',
	isGit: false,
	template: '',
}

const sleep = (ms = 3000) => new Promise(r => setTimeout(r, ms))
var projectDirectory = `${process.cwd()}/${projectData.name}`
// parse args
projectData.name = await getProjectName()
projectData.template = await getTemplate()
projectData.isGit = await getIsGit()

// template
var templatePath = ''
if (projectData.template == 'gulp') {
	templatePath = 'https://github.com/cofeek-codes/template-with-gulp.git'
} else if (projectData.template == 'basic') {
	templatePath = 'https://github.com/cofeek-codes/template.git'
}

// main

async function configureProject() {
	// create project folder
	try {
		if (projectData.name != '.')
			fs.mkdirSync(`${projectDirectory}/${projectData.name}`)
		consola.success('directory created')
	} catch (error) {
		if (error.code == 'EEXIST') {
			consola.error('this directory is already exists')
		} else {
			console.log(error)
		}
		process.exit(1)
	}
	// download files
	try {
		const spinner = ora('fetching project files\n').start()
		execSync(`git clone ${templatePath} ${projectData.name}`)
		spinner.stop()
		consola.success('files downloaded')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
	// install dependencies
	if (projectData.template !== 'basic') {
		try {
			const spinner = ora('installing dependencies\n').start()
			process.chdir(projectData.name)
			execSync('npm i')
			spinner.stop()
			consola.success('all dependencies installed successefully')
		} catch (error) {
			console.log(error)
			process.exit(1)
		}
	}
	// git init
	try {
		if (projectData.isGit) {
			execSync('git init')
			consola.success('git repository initialized')
		}
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

await configureProject()
