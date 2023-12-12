const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports =  new mongoose.model('Product', productSchema);