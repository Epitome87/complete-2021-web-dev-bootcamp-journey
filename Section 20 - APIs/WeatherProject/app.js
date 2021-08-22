const express = require('express');
const https = require('https'); // Native Node module for making requests

const app = express();

app.use(express.static('public'));
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

      if (weatherData.cod !== 200) return;

      let { temp } = weatherData.main;
      let { description: weatherDescription, icon } = weatherData.weather[0];

      const weatherString = `
      <style>@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;800&display=swap');

body {
  font-family: Poppins, sans-serif;
  background-color: #80add7;
  color: #ebf2ea;
}

.container {
  width: 80%;
  max-width: 800px;
  height: 80vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
}

.weather-card {
  background-color: #0abda0;
  width: 80%;
  border: 2px solid #ebf2ea;
  border-radius: 15px;
  padding: 25px;
  margin-top: 50px;
  box-shadow: 2px 5px rgba(0, 0, 0, 0.15);
}

.weather-card form {
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.weather-card form input,
.weather-card form select {
  box-sizing: content-box;
  font-size: 1rem;
  height: 35px;
  width: 35%;
  border: none;
  border-radius: 15px;
  margin: 10px 0;
}

.weather-card form input:focus {
  box-shadow: 2px 2px rgba(0, 0, 0, 0.15);
}

.weather-card button {
  background-color: #80add7;
  color: #ebf2ea;
  font-family: inherit;
  font-size: 2rem;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 5px rgba(0, 0, 0, 0.15);
  margin: 20px 10px 10px 10px;
  padding: 5px 15px;
  transition: 0.2s ease;
}

.weather-card button:hover {
  cursor: pointer;
  /* transform: scale(1.1); */
  background-color: hsl(209, 52%, 55%);
}

.weather-card button:active {
  transform: scale(0.98);
  box-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.weather-card input:focus,
.weather-card select:focus {
  outline: none;
}

@media (min-width: 800px) {
  .container {
    /* flex-direction: row; */
  }
}
 </style>
      <div class="container">
        <h1>Weather Report</h1>
        <div class="weather-card">
          <h1>Current Weather In ${city}</h1> 
          <p>Temperature: ${temp} ${unitMeasurement[units]}</p> 
          <p>Details: ${weatherDescription}</p>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png">;
        </div>
      </div>`;

      response.send(weatherString);
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
