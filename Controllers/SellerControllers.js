
const Product = require("../Model/ProductModel")
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const { CatchAsyncError } = require("../Middleware/CatchAsyncError");
const Catalog = require("../Model/CatologModel")
const order = require("../Model/OrderModel")



exports.createProduct = CatchAsyncError(async(req,res,next)=>{
    try {
        const { name, price } = req.body;
        console.log(req.body)

        const seller_id = req.user._id;
        const product = await Product.findOne({$and:[{seller_id:seller_id},{name:name}]})
        console.log(product)

        if(product){
            return next(new ErrorHandler("Product alerdy exist",400))
        }

        const newwProduct = await Product.create({ seller_id, name, price })

        res.status(200).json({
            message:"Product created Sucessfully",
            newwProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
    


})


exports.createCatolog = CatchAsyncError(async(req,res,next)=>{
try {
        const {sellerId}  = req.body;
        console.log(req.body)
    const productsBySeller = await Product.find({seller_id:sellerId});
        console.log(productsBySeller)
        const productIDs = productsBySeller.map(product => product._id);
        console.log(productIDs)
        
        const catalog = await Catalog.findOne({seller_id:sellerId})
        console.log(catalog)
        if(catalog){
            return next(new ErrorHandler("Catalog alerdy exist",400));
        }

        const newwcatalog = await Catalog.create({
            seller_id:sellerId,
            products: productIDs
        });

        res.status(201).json({ message: 'Catalog created successfully', newwcatalog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


exports.getOrders = CatchAsyncError(async (req, res) => {
    try {
        const orders = await order.find({ seller_id: req.user._id }); 
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

