![NotesApp](https://socialify.git.ci/ferilsunu/NotesApp/image?font=Jost&language=1&name=1&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Light)

A simple Notes Taking Application built with Node.js, MongoDB, and Express.js.

## Features

- 📌 Create, edit, and delete notes.
- 🕐 Timestamps for each note to track when it was created
- 🔍 Search and filter notes.
- 📂 Organize notes into categories.
- 💾 Data persistence with MongoDB.
- 🔒 User authentication and authorization with email verification

## Screenshot

![Application Screenshot](https://i.ibb.co/RSnHX47/image.png)

## Project Live URL

You can access the live version of this project [here](https://notes-app-8c1p.onrender.com/).

## Getting Started

To run this project locally, follow these steps:

 Clone this repository.

   ```
   git clone https://github.com/your-username/notes-taking-app.git
   ```

Install dependencies
```
cd notes-taking-app
npm install
```


Set up your MongoDB database and update the database connection in config.js.

Start the server.

```
npm start
```
Open your browser and visit http://localhost:3000 to use the application.

## Enviorment Variables

Create .env file in the root directory and paste the following and replace the required:
```
USER="enter email to be used to send confirmation emails"
PASSWORD="enter password for the email to be used"
PORT=3000
JWT_SECRET="thisisasecret"
DB_URL="your database url"
APP_URL="http://localhost:3000/"

```
