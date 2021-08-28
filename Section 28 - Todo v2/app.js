const express = require('express');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);

// GET function for home route
app.get('/', function (req, res) {
  // const day = date.getDate();

  Item.find({}, (error, foundItems) => {
    if (error) console.log('Error finding items');
    else {
      if (foundItems.length === 0) {
        fillWithDummyItems();
        res.redirect('/');
      } else res.render('list', { listTitle: 'Today', todoItems: foundItems });
    }
  });
});

// POST function for home route
app.post('/', function (req, res) {
  const newItem = new Item({
    name: req.body.newItem,
  });

  // Save the posted todo item to our database
  newItem.save();

  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, (error) => {
    if (!error) console.log('Succesfully deleted ' + checkedItemId);
  });

  res.redirect('/');
});

// GET function for About route
app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});

function fillWithDummyItems() {
  const defaultTodos = [
    new Item({ name: 'Welcome to your todo list!' }),
    new Item({ name: 'Hit the + button to add a new item.' }),
    new Item({ name: '<-- Hit this to delete an item.' }),
  ];
  Item.insertMany(defaultTodos, (error) => {
    if (error) console.log('Error: ', error);
    else console.log('Successfully added items to database');
  });
}
