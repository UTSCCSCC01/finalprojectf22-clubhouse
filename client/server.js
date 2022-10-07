const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

app.use(express.static('client/dist'));

// added this block
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});