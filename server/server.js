const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(cookieParser());
app.use(require("./routes/clubs"));
app.use(require("./routes/register"))
app.use(require("./routes/events"));
app.use(require("./routes/announcements"));
app.use(require("./routes/login"));
app.use(require("./routes/adminProfile"))

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log('Server is running on port: ' + port);
});