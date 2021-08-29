const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const databaseName = 'todoListDB';
const localDatabaseURL = 'mongodb://localhost:27017';
const cloudDatabaseURL =
  'mongodb+srv://Matthew:Heaven87@cluster0.1ryx5.mongodb.net';

// Local Database
// mongoose.connect(`${localDatabaseURL}${databaseName}`);

// MongoDB Atlas Database
mongoose.connect(`${cloudDatabaseURL}/${databaseName}`);

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [itemSchema],
});

const List = mongoose.model('List', listSchema);

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

app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, (error, foundList) => {
    if (!error) {
      if (foundList) {
        console.log('List already exists');
        res.render('list', {
          listTitle: customListName,
          todoItems: foundList.items,
        });
      } else {
        const list = new List({
          name: customListName,
          items: defaultTodos,
        });
        list.save();
        res.redirect(`/${customListName}`);
      }
    }
  });
});

// POST function for home route
app.post('/', function (req, res) {
  const listName = req.body.list;
  const newItem = new Item({
    name: req.body.newItem,
  });

  if (listName === 'Today') {
    newItem.save();
    res.redirect('/');
  } else {
    List.findOne({ name: listName }, (error, foundList) => {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect(`/${listName}`);
    });
  }
});

app.post('/delete', (req, res) => {
  const listName = req.body.listName;
  const checkedItemId = req.body.checkbox;

  if (listName === 'Today') {
    Item.findByIdAndRemove(checkedItemId, (error) => {
      if (!error) console.log('Succesfully deleted ' + checkedItemId);
    });

    res.redirect('/');
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      (error, foundList) => {
        if (!error) {
          res.redirect(`/${listName}`);
        }
      }
    );
  }
});

// GET function for About route
app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});

const defaultTodos = [
  new Item({ name: 'Welcome to your todo list!' }),
  new Item({ name: 'Hit the + button to add a new item.' }),
  new Item({ name: '<-- Hit this to delete an item.' }),
];

function fillWithDummyItems() {
  Item.insertMany(defaultTodos, (error) => {
    if (error) console.log('Error: ', error);
    else console.log('Successfully added items to database');
  });
}
