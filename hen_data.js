var mongoose = require('mongoose');

// creates new model for a hen for owner to add
var henSchema = mongoose.Schema({
  name: String, // name of the hen
  breed: String, // breed of hen
  description: String, // description of hen
  // date of first egg laid by hen
  month: Number,
  day: Number,
  year: Number,
  eggsPurchased: Number // number of eggs purchased from this hen
});

var Hen = mongoose.model("Hen", henSchema);

// export model to use in other files
module.exports = Hen;
