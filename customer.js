var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var router = express.Router();
var mongoose = require('mongoose');
var Hen = require('./hen_data.js');

// calculates the number of eggs available per hen (assuming 1 egg laid per day since first egg laid), renders customer page
router.get('/', function(req, res) {
  Hen.find(function(err, response){
    var hens = [];
     for (henInfo in response) {
        var dateString = response[henInfo].month + "/" + response[henInfo].day + "/" + response[henInfo].year; // date out of month, day, year
        var dateObject = new Date(dateString);
        const oneDay = 1000 * 60 * 60 * 24; // number of milliseconds in one day
        var presentDay = new Date(); // creates new date as the current date
        // calculates number of days between current date and date of first egg laid (number of eggs available for purchase from each hen)
        var eggsAvailable = Math.floor((presentDay.getTime() - dateObject.getTime()) / oneDay);

        // if eggs have been purchased before from this hen, subtracts number of eggs ordered from total number of eggs available
        if (response[henInfo].eggsPurchased) {
          response[henInfo].eggNumber = eggsAvailable - response[henInfo].eggsPurchased;
        } else { // if eggs have not been purchased, number of eggs available stays the same
          response[henInfo].eggNumber = eggsAvailable;
        }
        if (response[henInfo].eggNumber > 24) { // caps number of eggs that can be ordered at once at 24
          response[henInfo].maxEggs = 24;
        } else {
          response[henInfo].maxEggs = response[henInfo].eggNumber;
        }
      };
     res.render('show_eggs', {message: "No eggs available", type: "success", hens: response});
})});

// when order placed, updates the number of eggs available for each hen in database and renders order confirmation page
router.post('/confirm_order', function(req, res) {
  var orderDetails = req.body;
  Object.entries(orderDetails).forEach(([henID, eggsOrdered]) => {
    if (eggsOrdered > 0) { // if number of eggs purchased from a hen > 0, change hen's egg number in database
      Hen.findById(henID, function(err, hen) { // find hen by ID

          if (hen.eggsPurchased) { // adds number of eggs ordered to number of eggs purchased
            hen.eggsPurchased = hen.eggsPurchased + parseInt(eggsOrdered);
          } else {
            hen.eggsPurchased = eggsOrdered;
          }

          Hen.findByIdAndUpdate( // updates hen in database, changing number of eggs purchased
            {_id: henID},
            {eggsPurchased: hen.eggsPurchased}
          )
      })
    }
  });
  res.render('confirm_order', {message: "Order failed to go through", type: "success"});
});

// export router to use in index.js
module.exports = router;
