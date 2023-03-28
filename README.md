
# Title- Health Care App

Implementing a todo userinterface where one can manage their tasks for better productivity


## 🛠 Technologies Used
Javascript, HTML, CSS,ReactJS...


## Features

-User can do the following set of operations
- Add a new task :  A new task can be added with specifications such as Taskname,Start&EndTime,Category and Status in the Today component(page)
- Edit a Task : After adding a particular task user can edit the task by clicking on edit button
- Delete an individual task : An individual task can be deleted from the list of tasks added
- Clear All Tasks : Clears All the tasks in a single go

# Instructions to RUN
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to be followed & Available Scripts
Open the project folder in vscode.\
In the project directory,open new terminal and split into two.\
1. In second terminal install json server
### `npm install json-server`
- now run the below command to create a port
### `json-server --watch dbb.json --port=5000`

Local api is created and we already have dbb.json with a component called tasks

2. In first terminal run the react app with below command

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# User Interface
On starting the node package manager (npm start) your browser will automatically be opened and [http://localhost:3000](http://localhost:3000) page will be loaded which has the following components.\
## Today
- Consists a form where we input our task and submit it by clicking on '+'
## Tasks
Consists list of tasks added.\
We can perform the following operations.\ 
- Edit a particular task
- Delete a particular Task
- Clear all Tasks



