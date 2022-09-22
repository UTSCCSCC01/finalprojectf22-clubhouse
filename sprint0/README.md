## Motivation and Project Description
Our project is a webapp which allows UTSC students to connect with clubs by sharing information about upcoming events and allowing them to register to join the club right from the app.

## Installation for your Software/System
- Database
We used MongoDB for the database. We hosted our database through AWS via [MongoDB Atlas](https://www.mongodb.com/atlas/database). There is a free plan available and the rest of this installation will assume you use it. 
Just create an account and select your plan then it will create a cluster which will host your database.

- Configuration
Open `server/db.env` and replace the login credentials with the correct ones.

- Server
Download repo and run `node server.js` in the `server/` directory.

- Client
Download repo and run `npm start` in the `client/` directory 

## Contribution
In order to contribute please fork our repository and submit a pull request, we will be monitoring them. If you find an issue but do not have a solution please check out `Issues`.
