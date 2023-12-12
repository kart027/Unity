
const Product = require("../Model/ProductModel")
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const { CatchAsyncError } = require("../Middleware/CatchAsyncError");
const Catalog = require("../Model/CatologModel")



exports.getSellers = CatchAsyncError(async(req,res)=>{
    try {
        const sellers = await User.find({userType:"seller"})
        res.status(201).json({sellers})


    } catch (error) {
        res.status(500).json({
            error
        })
        
    }
})

exports.getSellerCatalog = CatchAsyncError(async (req, res) => {
    try{
    const { seller_id } = req.params;
    const catalog = await Catalog.find({ seller_id: seller_id }).populate('products'); // Assuming a reference to products in the Catalog model
    res.status(200).json({ catalog });
} catch (error) {
    res.status(500).json({ error: error.message });
}



})
exports.createOrder = CatchAsyncError(async (req, res) => {
  try {
    const seller_id = req.params;
    const {  products } = req.body;


    const order = new Order({
      buyer_id,
      seller_id,
      products 
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

