
var express = require('express');
var app = express();
var http = require('http');
var reactViews = require('express-react-views');
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

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
      callback(result);
    });
  }

app.get('/vista',(req,res)=>{
    res.render('vista',{nombre:'diego'});
});

  app.get('/insert', function (req, res) {
    console.log(req.query);
    MongoClient.connect(url, function(err, client) {
        db = client.db(dbName);
        insertDocuments(req.query,db, function(result) {
        res.send(result);
        client.close();
      });
    });
  });

  app.get('/read', (req,res)=>{
    console.log(req.query);
    MongoClient.connect(url, (err,client)=>{

      db = client.db(dbName);
      db.collection('prueba').find({'rut': req.query.rut}).forEach((respuesta)=>{
        console.log(respuesta);
        res.send(respuesta);
      });
      client.close();
    });
  });

  app.get('/delete',(req,res)=>{
    console.log(req.query.rut);
    MongoClient.connect(url,(err,client)=>{
      db = client.db(dbName);
      db.collection('prueba').deleteOne({'rut':req.query.rut},(result)=>{
        console.log(result);
        res.send(result);
      });
    });
  });

  app.get('/update', (req, res) => {

  	MongoClient.connect(url, (err, client) => {

  		if(err){

  			console.log(err);
  		}

  		db = client.db(dbName);


  		db.collection('prueba').updateOne(

  			{'rut': req.query.rut},
  			{
  				$set:{'nombre':req.query.nombre,
  					  'apellido':req.query.apellido,
  				      'edad': req.query.edad}
  			}
		);

  		client.close();
  	});
  	res.sendStatus(200);
  });

  app.get('/show', (req, res) => {

  	MongoClient.connect(url, (err,client) => {
      var arreglo = new Array();
  		if(err){
  			console.log(err);
  		}
  		db = client.db(dbName);
  		db.collection('prueba').find({}).toArray((err,result)=>{
        console.log(typeof result);
        result.map((dato)=>{
          arreglo.push(dato);
        });
        console.log(typeof arreglo);
        var stringeado= JSON.stringify(arreglo);
        res.render('vista',{usuarios:stringeado});
      });
  		client.close();
  	});
  });

  app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
  });
