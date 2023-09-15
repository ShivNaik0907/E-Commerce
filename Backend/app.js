const express= require("express");
const ErrorMiddleware = require("./middleware/error")

const app = express();

const path=require("path")

app.use(express.json());

//Route Import For Cart Items

// let CartIs = require("./routes/CartItemsRoute");

// app.use("/api/v1",CartIs);

//Route Import for Product

const product = require("./routes/productRoute");

app.use("/api/v1",product);







//Route Import for Orders
const Orders = require("./routes/OrderRoute")

app.use('/api/v1',Orders)



///////////////////////////////////

//Route Import for Users

const Users = require('./routes/UserRoute');

app.use('/api/v1',Users);

//Middleware for Errors 
app.use(ErrorMiddleware);


//Cookie Parser 
const cookieParser = require("cookie-parser")

app.use(cookieParser());

////////////////////////////////////////////////

//Route Import for Payment Processing Test
const Payment = require("./routes/PaymentRoute")

app.use('/api/v1',Payment)

// cloudinary related import

const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload)








// if(process.env.NODE_ENV=="production")
// {
//     app.use(express.static(path.join(__dirname,"../frontend/build")))

//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
//     })
// }




module.exports = app;