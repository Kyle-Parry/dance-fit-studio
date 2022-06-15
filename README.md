# Dance Fit Studio

## Getting Started

Dance Fit Studio is a fitness company based in Sydney New South Whales, Australia. This application is the work in progress for their new website and mobile app.

### Dependencies

Node.js, MySQL

### Backend technologies, framework and packages

- Express.js 4.17.3
- Express-session 1.17.2
- Passport.js 0.5.2
- Passport-local 1.0.0
- Bcrypt 5.0.1
- Express-rate-limit 6.3.0
- Express-slow-down 1.4.0
- Express-validator 6.14.0
- Mysql2 2.3.3

### Frontend technologies, framework and packages

- Static HTML/CSS/JS
- Bootstrap5
- React.js 18.1.0
- React-router-dom 6.3.0
- Axios 0.27.2
- Material Ui 5.8.2
- Formik 2.2.9
- Yup 0.32.11

## Installation for further development

To install this project locally you must first clone [this](https://github.com/Kyle-Parry/project) Github repository.
Once the repository has been cloned import the dance_fit_studio.sql schema into your MySQL database.
A .env file then needs to be created in the main directory of the cloned repository and contain the following code with your own details.

```
NODE_ENV=development
DB_PORT = 8080
SESSION_SECRET=SecretHere

DB_HOST=MySQLServerNameHere
DB_NAME=DatabaseNameHere
DB_USER=UsernameHere
DB_PASS=PasswordHere
```

Once the MySQL database and .env file has been setup open the main directory of the cloned repository in a terminal and run the following command to install:

```
npm install
```

### Sever Scripts

In this project you can run the following scripts in terminal:

```
npm start
```

This script is used to start the server and run the application.

```
npm run dev
```

This script is used for development to start the server with Nodemon which will restart the server upon changes to the code being saved.

### Frontend Scripts

The following scripts must be run in terminal while in the admin directory:

```
npm start
```

This script is used to start the react application.

```
npm run build
```

This script is used to compile and minify the code to prepare the application for deployment.

## Deployment

Deployment of this application first requires that the `npm run build` script has been ran in the admin directory and all files from the newest build folder have moved to the public folder in the admin directory ensuring that the files replace the existing files.

Once the build has been done the MySQL database must be setup using the dance_fit_studio.sql schema provided in this repository. When the database is ready, it must be connected through the hosting provider's config variables. The following environment variables must also be entered into the config variables:

```
DB_HOST=MySQLServerNameHere
DB_NAME=DatabaseNameHere
DB_USER=UsernameHere
DB_PASS=PasswordHere
SESSION_SECRET=SecretHere
```

Now that the database connection has been established this Github repository needs to be connected to your hosting provider (Heroku in this instance). Once the repository has been connected to the hosting provider the application is ready for deployment. This is done through the deployment tab of your hosting provider. With the repository connected simply select the branch that is ready to be deployed then click the deploy button to deploy the application.

## Road map

Moving forward this project has the following goals:

- Migrate the current static HTML/CSS/JS frontend into a React.js application.
- Placeholder images and text being replaced.
- Full admin functionality (View users' bookings, edit bookings, view logs).
- Ecommerce.
- Merchandise store.

[Dance Fit Studio](https://trello.com/invite/b/nWSew7Ua/88c7118c3494b5ef1dda3f40f2b1f807/dance-fit-studio)

## Known issues and bugs

This project has the following active issues and or bugs:

## Author

[Kyle Parry](https://github.com/Kyle-Parry)
