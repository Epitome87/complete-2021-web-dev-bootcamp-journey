const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.post('/', (request, response) => {
  const { number1, number2 } = request.body;
  const result = Number(number1) + Number(number2);
  response.send(`<h1>Calculation Complete!</h1> Result: ${result}`);
});

app.get('/bmicalculator', (request, response) => {
  response.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', (request, response) => {
  const weight = parseFloat(request.body.weight);
  const height = parseFloat(request.body.height);

  // BMI formula: kg/m^2
  // kg to pounds:  1kg = 2.20462 pounds
  // m to inches: 1m = 39.3701 inches

  const kilogramsPerPound = 1 / 2.20462;
  const metersPerInch = 1 / 39.3701;
  const calculatedBMI =
    (weight * kilogramsPerPound) /
    (height * metersPerInch * height * metersPerInch);

  response.send(`<h1>Your Body Mass Index Is:</h1> ${calculatedBMI}`);
});

app.listen(3000, () => {
  console.log('Connected on Port 3000');
});
