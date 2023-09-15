const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

const CatchAysncError = require('../middleware/ErrorAsyncHandler')



const ApiFeatures = require('../utils/ApiFeatures')

//Creating PRODUCT --ADMIN ONLY

exports.CreateProduct = CatchAysncError(async(req,res,next)=>{

    req.body.createdByUser = req.user.id;

    console.log(req.body)

    const product = await Product.create(req.body);

    console.log(product)

    const link = req.body.link;
    console.log(link)

    product.productImage.push({public_ID:"ABCD",image_url:link})

    await product.save()

    console.log(product)

    res.status(200).json({
        success:true,
        product
    })


});

//Get List Of All Products
exports.getAllProduct=CatchAysncError(async(req,res,next)=>{
    console.log('ss')
   
    const ProductToShow_PerPage = 20;

    const product_count = await Product.countDocuments();
   
    const Apifeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(ProductToShow_PerPage);
    // const Allproducts = await Product.find();
    //  or we cn write now as:
    // console.log('ss')
    const Allproducts = await Apifeature.query;

    console.log(Allproducts)



    if(!Allproducts)
    { 
        //!Allproducts never gets Null dont know why
        return next(new ErrorHandler("Product Not Found",500));
    }

     
 res.status(200).json({
    success:true,        
    Allproducts,
    productsCount:product_count,
    ProductToShow_PerPage
  });

});


//Update The Product --ADMIN ONLY
exports.UpdateProduct = CatchAysncError(async(req,res,next)=>{


    // console.log("UPDATE K LIYE AAYA KYA",res.params.id,req.body)

    let product = await Product.findById(req.params.id);

    console.log(product);
    
    if(!product)
    {
        //!product never gets Null dont know why===== await use nhi kiya tha
        return next(new ErrorHandler("Product Not Found",500));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })


});


//Delete The Product -- ADMIN
exports.DeleteProduct= CatchAysncError(async (req,res,next)=>{

    let product = await Product.findById(req.params.id);
    

    // console.log(product)

    if(!product)
    {
        console.log("nahimila")
        
        return next(new ErrorHandler("Product Not Found",500));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product Removed Successfully !"
    })

    console.log(product)
});


//Get Product Detail of One
exports.GetSingleProductDetail = CatchAysncError(async (req,res,next)=>{

    
    let product = await Product.findById(req.params.id);
     
    // console.log(product)

    if(!product)
    {
        console.log("nahimila")
        return next(new ErrorHandler("Product Not Found",500));
    
    }
    
    res.status(200).json({
        success:true,
        product
    })
});


//FOR ADMIN VIEW PRODUCT LIST OF WEBSITE STOCK
exports.ADMIN_getAllProduct=CatchAysncError(async(req,res,next)=>{
    const Allproducts = await Product.find();
     
 res.status(200).json({
    success:true,        
    Allproducts
  });

});
