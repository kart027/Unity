
const Product = require("../Model/ProductModel")
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const { CatchAsyncError } = require("../Middleware/CatchAsyncError");
const Catalog = require("../Model/CatologModel")



exports.createProduct = CatchAsyncError(async(req,res)=>{
    try {
        const { name, price } = req.body;

        const seller_id = req.user._id;
        const product = await Product.find({$and:[{seller_id:seller_id},{name:name}]})

        if(product){
            return next(new ErrorHandler("Product alerdy exist",400))
        }

        const newwProduct = await Product.create({ seller_id, name, price })

        res.status(200).json({
            message:"Product created Sucessfully",
            newwProduct
        })
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
    


})


exports.createCatolog = CatchAsyncError(async(req,res)=>{
try {
        const { seller_id } = req.body;
        const productsBySeller = await Product.find({ seller_id });
        const productIDs = productsBySeller.map(product => product._id);
        const catalog = new Catalog({
            seller_id,
            products: productIDs
        });

       
        await catalog.save();

        res.status(201).json({ message: 'Catalog created successfully', catalog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


exports.getOrders = CatchAsyncError(async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user.userId }); 
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

