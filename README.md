## Motivation and Project Description
Our project is a webapp which allows UTSC students to connect with clubs by sharing information about upcoming events and allowing them to register to join the club right from the app.

## Installation for your Software/System
- Database

We used MongoDB for the database. We hosted our database through AWS via [MongoDB Atlas](https://www.mongodb.com/atlas/database). There is a free plan available and the rest of this installation will assume you use it. 
Just create an account and select your plan then it will create a cluster which will host your database.

- Configuration
Open `/finalprojectf22-minimum-viable-percentage/config.env` and replace the database string with yours which you can get from your database host.
[Download sample config.env](https://cdn.discordapp.com/attachments/1016744999280459842/1023074197112623175/config.env)
- Setup
`npm i`
Please make sure you have a config.env file in the main folder, which sets the ATLUS_URI environment variable 

- Dev API Server
`npm run api_serve`

- Dev Client Server
`npm run client_serve`

- Client & API & React Watcher
`npm run dev`

## Contribution
In order to contribute please fork our repository and submit a pull request, we will be monitoring them. If you find an issue but do not have a solution please check out `Issues`.
