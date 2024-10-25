const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Schema
const itemSchema =new schema({
   image:{
    type: String,
    //  required: true
   },

   product_name:{
    type: String,
    required: true
   },

   product_description:{
    type: String,
    required: true
   },
   product_price:{
    type: Number,
    required: true,
    min: 0
   }

});

//Model
const item = mongoose.model('items', itemSchema);

//Export module
module.exports = item;