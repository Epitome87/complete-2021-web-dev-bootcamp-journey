const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const todoList = [];

app.post('/', (req, res) => {
  const { newTodo } = req.body;
  
  res.render('todoList');
});

app.get('/new', (req, res) => {
  res.render('todoForm');
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
