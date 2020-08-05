const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Item = new Schema({
  item_name: {
    type: String
  },
  item_description: {
    type: String
  },
  item_price: {
    type: String
  },
  image: {
    type: String,
  }
}, {
  collection: 'items'
})

module.exports = mongoose.model('Item', Item)