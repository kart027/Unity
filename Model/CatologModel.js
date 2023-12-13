
const mongoose = require('mongoose'); 

const catalogSchema = new mongoose.Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports  = new mongoose.model('Catalog', catalogSchema);