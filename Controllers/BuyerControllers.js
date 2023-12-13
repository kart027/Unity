
const Product = require("../Model/ProductModel")
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const { CatchAsyncError } = require("../Middleware/CatchAsyncError");
const Catalog = require("../Model/CatologModel")
const Order = require("../Model/OrderModel")



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
    const { sellerId } = req.params;
    const catalog = await Catalog.find({ seller_id: sellerId }).populate('products'); // Assuming a reference to products in the Catalog model
    res.status(200).json({ catalog });
} catch (error) {
    res.status(500).json({ error: error.message });
}



})



exports.createorder = CatchAsyncError(async(req,res,next)=>{
  try {
   const { sellerId } = req.params;
    const buyer_id = req.user._id;
    const { products } = req.body;
    // console.log(products)

    if(products.length == 0){
      return next(new ErrorHandler("please add atleast one product",400))
    }

    const newworder = await Order.create({
      seller_id: sellerId,
      buyer_id,
      products
    })

    res.status(200).json({
      message: "sucessful",
      newworder
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
  
}
)


