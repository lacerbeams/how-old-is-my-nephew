var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var hbs = require('express-handlebars');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/how-old';

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static Routes
// GET '/' => '/public/index.html'
app.use(express.static(__dirname + '/public'));


var today = new Date()
var todaysDate = today.getDate()
var todaysMonth = today.getMonth() + 1
var todaysYear = today.getFullYear()

app.post('/insert', function(req, res) {
  var data = {
    person: req.body.person,
    birthdate: req.body.birthdate,
  }
  //console.log(data) { person: 'John', birthdate: '1947-06-15' }
  var person = data.person
  var birthDate = data.birthdate.split('-')
  var birthMonth = birthDate[1];
  var birthYear = birthDate[0];
  if (todaysMonth >= birthMonth && todaysDate >= birthDate[2]){
    var age = todaysYear - birthYear;
  } else {
    var age = todaysYear - birthYear - 1;
  }
  // data.age = age;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('people').insertOne(data, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });
  res.redirect('/');
})

app.get('/data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var dataFromDB = db.collection('people').find({})
    dataFromDB.forEach(function(doc){
      resultArray.push(doc);
      console.log(resultArray)
    },
    function () {
      db.close();
      res.json(resultArray);
    });
  });
});

app.post('/people/:id/delete', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection('people').deleteOne({_id: objectId(id)}, function(err, result) {
      db.close();
      res.json(result);
    })
  })
})

app.post('/', function(req, res) {
  res.redirect('/');
})

// app.post('/update', function(req, res) {
//   // res.redirect('/');
//   var resultArray = [];
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     var dataFromDB = db.collection('people').find({})
//     dataFromDB.forEach(function(doc){
//       resultArray.push(doc);
//       console.log(resultArray)
//     })
//     resultArray.forEach(function(data) {
//       var person = data.person
//       var birthDate = data.birthdate.split('-')
//       var birthMonth = birthDate[1];
//       var birthYear = birthDate[0];
//       if (todaysMonth >= birthMonth && todaysDate >= birthDate[2]){
//       var age = todaysYear - birthYear;
//       } else {
//       var age = todaysYear - birthYear - 1;
//       }
//       db.collection('people').findOneAndUpdate({person: person}, {$set: {age: age}}, {upsert: true}, function(err,doc) {
//        if (err) { throw err; }
//        else { console.log("Updated"); }
//      });
//     })
//     console.log(resultArray)
//       db.close();
//       res.json(resultArray);
//   });
// })


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});
