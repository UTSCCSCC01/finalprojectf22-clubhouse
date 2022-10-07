const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

app.use(express.static('client/dist'));

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});

