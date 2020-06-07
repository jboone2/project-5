//jshint esversion: 6

const express = require('express');
const app = express();

// Get default port; if none exists, use 3000.
const port = process.env.PORT || 3000;

// if someone asks for root directory of this server, they get "hello world"
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Express web app available at localhost:${port}`);
});
