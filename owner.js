var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hen = require('./hen_data.js');

var time = Date.now();

// renders a page that shows all the hens in a table
router.get('/', function(req, res) {
  Hen.find(function(err, response){
     res.render('show_hens', {message: "No hens yet", type: "success", hens: response})
})});

// renders a page that allows owner to put details in a form to create a new hen
router.get('/hen', function(req, res) {
  res.render('add_hen');
});

/* if any of the entries in the form are empty, raises an error, otherwise creates and saves a new hen in database
with a redirect to original owner page */
router.post('/hen', function(req, res){
   var henInfo = req.body; // get the parsed information

   if(!henInfo.name || !henInfo.breed || !henInfo.description || !henInfo.month || !henInfo.day || !henInfo.year){
      res.render('add_hen', {
         message: "Please fill all required entries", type: "error"});
   } else {
      var presentDay = new Date();
      var newHen = new Hen({
         name: henInfo.name,
         breed: henInfo.breed,
         description: henInfo.description,
         month: henInfo.month,
         day: henInfo.day,
         year: henInfo.year,
         eggsPurchased: 0 // sets default eggs purchased to 0
      });
      newHen.save(function(err, Hen){ // saves new hen and redirects to owner page
         if(err)
            res.send('err');
        else
            res.redirect('/owner');
      });
   }
});

// export router to use in index.js
module.exports = router;
