const express = require('express');
const https = require('https');

const app = express();

app.use(express.urlencoded());

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/signup.html');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
