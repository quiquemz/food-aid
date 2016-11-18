/* Module dependencies. */

var bodyParser = require('body-parser');
var express = require('express');
var handlebars = require('express3-handlebars');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var path = require('path');
var _ = require('lodash');

// Route Functions
var index = require('./routes/index');
var register = require('./routes/register');
var settings = require('./routes/settings');
var support = require('./routes/support');
var paymentinfo = require('./routes/paymentinfo');

//Customer Routes Functions
var customerHome = require('./routes/customer/home');
var deal = require('./routes/customer/deal');
var orderSummary = require('./routes/customer/order-summary');
var map = require('./routes/customer/map');

//Retailer Routes Functions
var retailerHome = require('./routes/retailer/home');
var retailerOptions = require('./routes/retailer/options');
var retailerInfo = require('./routes/retailer/info');
var retailerVerification = require('./routes/retailer/verification');
var retailerConfirmation = require('./routes/retailer/confirmation');

//JSON OBJECTS
var users = require('./users.json');
var offers = require('./data.json');

// express variable
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Re-routing to login st
app.get('/', function (req, res) {
  res.redirect('/login');
});

// Add routes here
app.get('/login', index.view);
app.post('/login', login);
app.get('/register', register.view);
app.post('/register', registerNewUser);
app.get('/settings', settings.view);
app.get('/support', support.view);
app.get('/paymentinfo', paymentinfo.view);

// Routes to see current state of database
app.get('/users', function(req, res) {
  res.send(users);
});
app.get('/offers', function(req, res) {
  res.send(offers);
});

// Add customer routes
app.get('/customer/home', function(req, res){
  res.render('customer/home', offers);
});
app.get('/customer/deal', deal.view);
app.get('/customer/order-summary', orderSummary.view);
app.get('/customer/map', map.view);

//Add retailer routes
app.get('/retailer/home', retailerHome.view);
app.post('/retailer/home', createNewOffer);
app.get('/retailer/info',retailerInfo.view);
app.get('/retailer/options',retailerOptions.view);
app.get('/retailer/verification',retailerVerification.view);
app.get('/retailer/confirmation', retailerConfirmation.view);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//Helper functions
function login(req, res) {
  var email = req.body.email;
  var passw = req.body.password;
  var retailer = req.body.retailer === 'on';
  var user = _.find(users.usersList, {'email': email, 'password': passw});
  if(user && retailer)
    res.redirect('/retailer/home');
  else if(user)
    res.redirect('/customer/home');
  else
    res.redirect('/login');
}

function registerNewUser(req, res) {
  users.usersList.push(
      {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password,
        "id": (users.usersList.length + 1)
      }
  );
  res.redirect('/login');
}

function createNewOffer(req, res) {
  console.log(req.body.localImg);
  offers.offers.push({
    "owner": req.body.owner,
    "name": req.body.name,
    "id": offers.offers.length + 1,
    "wait-time": "35-50 min",
    "offer": req.body.offer,
    "price": parseInt(req.body.price),
    "price-per-unit": "$" + req.body.price + ".00/" + req.body.measure,
    "quantity": parseInt(req.body.quantity),
    "img": "http://images.indianexpress.com/2016/05/breads_759_thinkstockphotos-484163886.jpg",
    "local-img": "/images/food-bread.jpg"
  });
  res.redirect('/customer/home');
};

/*var url = 'mongodb://localhost:27017/myproject';

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    findDocuments(db, function () {
      db.close();
    });
  });
});*/

