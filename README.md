# Dance Fit Studio

## Description

This app has two main purposes the first of which is to create an easy and smooth process for customers to purchase one of DFS’s packages, purchase a subscription plan, book/reschedule/cancel bookings, view their account details, and purchase merchandise. The secondary function of this app is to simplify and automate functions to help the business run smoothly through automating email notifications, tracking clients who need to sign a medical waiver, and tracking class bookings.

## Getting Started

### Dependencies

Node.js
MySQL

### Installing

To install this project you must first clone [this](https://github.com/Kyle-Parry/project) Github repository.
Once the repository has been cloned import the dance_fit_studio.sql schema into your MySQL database.
A .env file then needs to be created in the main directory of the cloned repository and contain the following code with your own details.

```
NODE_ENV=development
DB_PORT = 8080

DB_HOST=MySQLServerNameHere
DB_NAME=DatabaseNameHere
DB_USER=UsernameHere
DB_PASS=PasswordHere
```

Once the MySQL database and .env file has been setup open the main directory of the cloned repository in a terminal and run the following command to install:

```
npm install
```

### Scripts

In this project you can run the following scripts in terminal:

```
npm start
```

This script is used to start the server and run the application.

```
npm run dev
```

This script is used to run the nodemon server that will refresh upon changes made to the code.

## Author

[Kyle Parry](https://github.com/Kyle-Parry)
