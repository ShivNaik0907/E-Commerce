//we hae used STRIPE PACKAGE for Payment Testing Purpose

const CatchAysncError = require('../middleware/ErrorAsyncHandler')


const STRIPE_API_KEY ="pk_test_51LqbsDSEXYJYfw16PPnMORYOPWJakqmNjH2k0ihYZ7cGOsSAB62VxMnrF6ZTvSjiMuPaUkU2FO2FtQqn1Utx4OXi00WHQjlNz2"

const STRIPE_SECRET_KEY = "sk_test_51LqbsDSEXYJYfw16xB2Ki9mhvjcgMoIbU15iGVDsbWeGGOZ2TevnDlbhLZjN8F4bKby4CkWyabWlA3V7VXDhqpXv00RgOTba2d"



const stripe = require("stripe")(STRIPE_SECRET_KEY)
//here STRIPE SECRET KEY Is developer facility ID that we will get after signing Up on STRIPE WEBSITE

exports.processPayment = CatchAysncError(async(req,res,next)=>{

    console.log("STRIPE KEY BHEJ RAHA")
    
    const myPayment = await stripe.paymentIntents.create({
        
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce"
        }
    });


    console.log(myPayment)


    res.status(200).json({success:true,client_secret:myPayment.client_secret})
})




//Function to send STRIPE API KEY in frontend (not SECRET KEY)

exports.sendStripeAPIKey=CatchAysncError(async(req,res,next)=>{

    // console.log("STRIPE KEY BHEJ RAHA ",STRIPE_API_KEY)

    res.status(200).json({stripeAPIkey:STRIPE_API_KEY})

});