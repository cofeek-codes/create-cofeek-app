#!/usr/bin/env node
import { execSync } from 'child_process'
import { program } from 'commander'
import consola from 'consola'
import fs from 'fs'
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'
import path from 'path'
import ora from 'ora'

// vars

var projectData = {
	name: '',
	isGit: false,
}
var templatePath = 'https://github.com/cofeek-codes/template-with-gulp.git'
var projectDirectory = `${process.cwd()}/${projectData.name}`

const sleep = (ms = 3000) => new Promise(r => setTimeout(r, ms))
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
	console.log(projectData.name)
}

async function getIsGit() {
	const isGit = await inquirer.prompt({
		name: 'is_git',
		type: 'confirm',
		message: 'do you want to use Git?',
		default() {
			return false
		},
	})
	projectData.isGit = isGit.is_git
	console.log(projectDirectory)
	console.log(projectData.name)
}

// main

async function configureProject() {
	// create project folder
	try {
		fs.mkdirSync(`${projectDirectory}/${projectData.name}`)
	} catch (error) {
		if (error.code == 'EEXIST') {
			consola.error('this directory is already exists')
		} else {
			console.log(error)
		}
		process.exit(1)
	} finally {
		consola.success('directory created')
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

await getProjectName()
await getIsGit()
await configureProject()
