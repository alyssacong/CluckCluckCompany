var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cluck-cluck-co');

app.use(express.static('images'));
app.use(bodyParser.json());

// for parsing application
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// set pug directory as view engine
app.set('view engine', 'pug');
app.set('views', './views');

// renders homepage pug file upon root
app.get('/', function(req, res) {
  res.render('homepage')
})

// connects owner.js to /owner
var ownerpage = require('./owner.js');
app.use('/owner', ownerpage);

// connects customer.js to /customer
var customerpage = require('./customer.js');
app.use('/customer', customerpage);

app.listen(3000);
