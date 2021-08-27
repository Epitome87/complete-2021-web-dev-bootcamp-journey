const { MongoClient } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((error) => {
  assert.equal(null, error);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  insertDocuments(db, function () {
    client.close();
  });
});

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  //   collection.insertMany(
  //     [
  //       { name: 'Apple', score: 8, review: 'Great fruit' },
  //       { name: 'Orange', score: 6, review: 'Kinda sour' },
  //       { name: 'Banana', score: 9, review: 'Great stuff!' },
  //     ],
  //     function (error, result) {
  //       //   assert.equal(error, null);
  //       //   assert.equal(3, result.result.n);
  //       //   assert.equal(3, result.ops.length);
  //       console.log('Inserted 3 documents into the collection');
  //       callback(result);
  //     }
  //   );
  findDocuments(db, function () {
    client.close();
  });
};

const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function (error, fruits) {
    assert.equal(error, null);
    console.log('Found the following reocrds');
    console.log(fruits);
    callback(fruits);
  });
};
