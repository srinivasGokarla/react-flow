# Workflow Builder Application

## Overview

This project aims to create a comprehensive workflow builder application using React.js, Reactflow, and Node.js. Users can visually construct workflows for basic data manipulation tasks, such as filtering data, converting formats, and sending POST requests. The application allows users to save and load workflows, as well as execute them on uploaded data.

## Features

1. **Drag-and-Drop Interface**: Users can drag and drop predefined workflow nodes onto the canvas to build their desired workflow.
2. **Workflow Execution**: Users can execute workflows on uploaded data. The backend interprets the workflow and executes tasks in the defined sequence.
3. **Save and Load Workflows**: Users can save and load previously created workflows for reuse.
4. **Visual Feedback**: The application provides visual feedback to showcase the workflow execution progress.
5. **Upload Data and Execute Workflow**: Users can upload CSV files and select a workflow to trigger the execution.

## Frontend (Reactflow)

- **Components**: 
  - `App.js`: Main component handling workflow creation, execution, and interaction.
  - `Sidebar.js`: Sidebar component containing draggable nodes for building workflows.
- **Integration with Reactflow**: Utilizes Reactflow for creating the drag-and-drop interface and visual representation of workflows.

## Backend (Node.js)

- **Express Server**: Provides API endpoints for workflow execution, saving, and loading.
- **Database**: Uses MongoDB storing workflow definitions.
- **Workflow Execution**: Processes workflow data received from the frontend and executes tasks according to the defined sequence.

## Deployed link
[link](https://reactflow-frontend-npdfwynuy-srinivasgokarla.vercel.app/)

## Installation or How to run the app
I created cloud database using MongoDb Atlas. So, if you want to run our code then please read the instructions below :
- Clone our repository `https://github.com/srinivasGokarla/react-flow`
- Open the code in your VS code, open Backend folder in the terminal by running `cd Backend`
-Now run `npm install` or `npm i` which will install all the required packages of node
- After installation, now run `npm run server` and  you will see `server is listening on 5900` 
- Simlutaniously, open a new terminal and run `cd frontend` by which you get into frontend folder
- Now here, run `npm install` or `npm i` which will install all the required packages of react aswell
- After installation, now run `npm start` and  you will see a new window will be opening in the default browser which is running on port `http://localhost:3000`
- Open MongoDb compass and url `mongodb://localhost:27017/todo` which will create database collection named todo
- Now you see app running.


## Technology Stack
List and provide a brief overview of the technologies used in the project.

- MongoDB
- Express JS
- React JS
- ReactFlow
- Node JS


#### Backend
- `express-validator` <br/>
   used for validation
- `mongoose`<br/>
  connecting MongoDB to the Node js server
- `nodemon`<br/>
  It monitors your project and automatically restarts when detects any changes.
- `cors`<br/>
  allowing browser should permit loading resources


#### Frontend
- `axios`<br/>
  JavaScript library to make HTTP requests or fetching data
- `react-router-dom`<br/>
  implementaion of dynamic routing 



#### Cloud Deployment

- Render
used Render for deploying the MongoDB (database), node js (Backend).
- vercel 
used vercel for deploying reactjs(frontend)



