const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/fruitsDB';

mongoose.connect(url);

// Define the structure of fruit
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Fruit name is required'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});

// Use singular name for collection name argument
const Fruit = mongoose.model('Fruit', fruitSchema);

const pineapple = new Fruit({
  name: 'Pineapple',
  score: 9,
  review: 'Great fruit',
});

const strawberry = new Fruit({
  name: 'Strawberry',
  score: 10,
  review: 'God tier fruit',
});

strawberry.save();

pineapple.save();

const apple = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'Pretty solid as a fruit',
});
apple.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 10,
  review: 'The best fruits!',
});
const orange = new Fruit({
  name: 'Orange',
  rating: 4,
  review: 'Too sour for me',
});

Fruit.insertMany([kiwi, orange], (error) => {
  if (error) console.log('Error: ', error);
  else console.log('Successfully saved all fruits to fruitsDB!');
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'Matthew',
  age: 34,
});

person.save();

const caitlin = new Person({
  name: 'Caitlin',
  age: 30,
  favoriteFruit: pineapple,
});

caitlin.save();

// Fruit.find({ name: 'Kiwi' }, (error, results) => {
//   if (error) console.log('Error: ', error);
//   else {
//     for (let fruit of results) {
//       console.log('Fruit name: ', fruit.name);
//     }
//   }
// });

Fruit.updateOne({ rating: 10 }, { name: 'Peach' }, (error) => {
  if (error) console.log('Error: ', error);
  else console.log('Successfully updated the document');
});

Fruit.deleteOne({ name: 'Peach' }, function (error) {
  if (error) console.log('Error: ', error);
  else console.log('Successfully deleted document');
});

Fruit.deleteMany({ name: 'Kiwi' }, (error) => {
  if (error) console.log(error);
  else console.log('Deleted all!');
});

Person.updateOne(
  { name: 'Matthew' },
  { favoriteFruit: strawberry },
  (error) => {
    if (error) console.log(error);
    else console.log('Updated');
  }
);

// mongoose.connection.close();
