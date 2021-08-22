const express = require('express');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/signup.html');
});

app.post('/', (request, response) => {
  const { first, last, email } = request.body;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: first,
          LNAME: last,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const listID = 'd8d640a9f0';
  const url = 'https://us5.api.mailchimp.com/3.0/lists/' + listID;

  const options = {
    method: 'POST',
    auth: 'epitome87:f01c0afd95734cdb7368e8771837ca87-us5',
  };

  const mailChimpRequest = https.request(url, options, (mailchimpResponse) => {
    if (mailchimpResponse.statusCode === 200) {
      response.sendFile(__dirname + '/success.html');
    } else {
      response.sendFile(__dirname + '/failure.html');
    }
    mailchimpResponse.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });

  mailChimpRequest.write(jsonData);
  mailChimpRequest.end();
});

app.post('/failure', (request, response) => {
  response.redirect('/');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// API: f01c0afd95734cdb7368e8771837ca87-us5
// List ID: d8d640a9f0
