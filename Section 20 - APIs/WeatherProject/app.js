const express = require('express');
const https = require('https'); // Native Node module for making requests

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  // Do it like this if we are using a regular HTML file
  // response.sendFile(__dirname + '/index.html');

  response.render('weatherForm');
});

app.post('/', async (request, response) => {
  let { city, units } = request.body;
  if (!units) units = 'standard';
  const apiKey = '774d10b92b6a5fb4aaaa24df60c644e6';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  const unitMeasurement = {
    standard: 'Kelvin',
    imperial: 'Fahrenheit',
    metric: 'Celsius',
  };

  https.get(url, (weatherResponse) => {
    console.log('Status Code:', weatherResponse.statusCode);

    weatherResponse.on('data', (data) => {
      // Data is storing Hex values that represent JSON -- parse it into a JS object
      let weatherData = JSON.parse(data);

      if (weatherData.cod !== 200) return;

      let { temp } = weatherData.main;
      let { description: weatherDescription, icon } = weatherData.weather[0];

      response.render('weatherReport', {
        city,
        temp,
        weatherDescription: weatherDescription.toUpperCase(),
        icon,
        units: unitMeasurement[units],
      });
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
