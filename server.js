
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient,
  co = require('co'),
  assert = require('assert');

const url = 'mongodb://localhost:27017';

  // Database Name
const dbName = 'lab6';

  // Use connect method to connect to the server


const insertDocuments = function(insertItems,db, callback) {
    // Get the documents collection
    const collection = db.collection('prueba');
    // Insert some documents
    collection.insertMany([
      insertItems
    ], function(err, result) {
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }


  app.get('/insert', function (req, res) {
    console.log(req.query);
    MongoClient.connect(url, function(err, client) {
        db = client.db(dbName);
        insertDocuments(req.query,db, function() {
        client.close();
        res.send(200);
      });

    });

  });

  app.get('/read', (req,res)=>{
    console.log(req.query.keys());
  /*  MongoClient.connect(url, (err,client)=>{

      db = client.db(dbName);
      db.collection('prueba').find({'apellido': req.query.apellido}).forEach((respuesta)=>{
        console.log(respuesta);
        res.send(respuesta);
      });
      client.close();
    });*/
  });

  app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
  });
