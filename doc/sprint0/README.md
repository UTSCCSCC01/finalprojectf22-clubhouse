## Motivation and Project Description
Our project is a webapp which allows UTSC students to connect with clubs by sharing information about upcoming events and allowing them to register to join the club right from the app.

## Installation for your Software/System
- Database

We used MongoDB for the database. We hosted our database through AWS via [MongoDB Atlas](https://www.mongodb.com/atlas/database). There is a free plan available and the rest of this installation will assume you use it. 
Just create an account and select your plan then it will create a cluster which will host your database.
DataBase Creds- Username: UTSC-ClubHouse123  ,   Password: b6R3JJvL4a2aYeAd
- Configuration

Open `/finalprojectf22-minimum-viable-percentage/server/config.env` and replace the database string with yours which you can get from your database host.

- Server

```npm install express
cd /finalprojectf22-minimum-viable-percentage/server/
npm i
node server.js
Server is running on port: 5001
Successfully connected to MongoDB.
```

- Client

```cd /finalprojectf22-minimum-viable-percentage/client/
npm i
npm start dev
```

## Contribution
In order to contribute please fork our repository and submit a pull request, we will be monitoring them. If you find an issue but do not have a solution please check out `Issues`.
