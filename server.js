var express = require('express');
var app = express();
var mongojs = require('mongojs');
// var db = mongojs('teachers', ['teachers']);
 var db = mongojs('mongodb://root:root@ds061325.mongolab.com:61325/collyfyy', ['teachers']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/teachers', function (req, res) {
  console.log('I received a GET request');
 
  db.collection('teachers').find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

 app.post('/teachers', function (req, res) {
  console.log(req.body);
  db.collection('teachers').insert(req.body, function(err, doc) {
    res.json(doc);
  });
  
  
  	
	/* 	db.collection('contactlist').insert({ myfield: disp}, function(err, doc) {

    if(err) throw err;
    console.log("yes it is inserted");
   }); 
   */
  
  
});

app.delete('/teachers/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.collection('teachers').remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/teachers/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.collection('teachers').findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/teachers/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.collection('teachers').findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(6000);
console.log("Server running on port 6000");