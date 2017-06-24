require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const hbs = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const app = express()
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const assert = require('assert');
const User = require('./models/user.js')

// CONFIG
require('./db/config')
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}))
app.set('view engine', 'hbs')

// ROUTES
app.use('/auth', require('./routes/auth'))
app.use(require('./routes/error'))


const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/how-old';


const today = new Date()
const todaysDate = today.getDate()
const todaysMonth = today.getMonth() + 1
const todaysYear = today.getFullYear()


//creates user
app.post('/', function(req, res, next){
  function makeUser (obj) {
    obj.search = {
      user: {
        name: obj.user.name,
        fb_id: {},
        family_members: []
      }
    }
  }
});

//saves family data
app.post('/save', function(req, res) {
  var fb_name = new User( {
    name: req.session.user.name,
    fb_id: req.session.user.id
  });
  let obj = {};
  obj = {
    name: req.body.person,
    date: req.body.birthdate,
  }
  fb_name.family_members.push(obj);
  fb_name.save();
  res.json('saved to req.session.family!')
})

//old way of doing this
// app.post('/insert', function(req, res) {
//   var data = {
//     person: req.body.person,
//     birthdate: req.body.birthdate,
//   }

//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('people').insertOne(data, function(err, result) {
//       assert.equal(null, err);
//       console.log('Item inserted');
//       db.close();
//     });
//   });
//   res.redirect('/');
// })

//gets family data
app.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');

  var resultArray = [];
  User.find({fb_id: user.id})
      .then( (users) => {
        resultArray = users[0].family;
      })
      res.json(resultArray)
});

//old way of doing this
// app.get('/data', function(req, res, next) {
//   var resultArray = [];
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     var dataFromDB = db.collection('people').find({})
//     dataFromDB.forEach(function(doc){
//       resultArray.push(doc);
//       console.log(resultArray)
//     },
//     function () {
//       db.close();
//       res.json(resultArray);
//     });
//   });
// });



// app.post('/people/:id/delete', function(req, res) {
//   var id = req.params.id;
//   mongo.connect(url, function(err, db) {
//     db.collection('people').deleteOne({_id: objectId(id)}, function(err, result) {
//       db.close();
//       res.json(result);
//     })
//   })
// })

// app.post('/', function(req, res) {
//   res.redirect('/');
// })





var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});
