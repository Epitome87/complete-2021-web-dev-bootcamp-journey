const express = require('express');
const https = require('https'); // Native Node module for making requests

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.post('/', async (request, response) => {
  const { city, units } = request.body;
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
      let { temp } = weatherData.main;
      let { description: weatherDescription, icon } = weatherData.weather[0];

      const weatherString =
        `<h1>Current Weather In ${city}</h1>` +
        `<p>Temperature: ${temp} ${unitMeasurement[units]}</p>` +
        `<p>Details: ${weatherDescription}</p>` +
        `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

      response.send(weatherString);
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
