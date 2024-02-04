const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.auth = async (req, res, next) => {
    try{
 const token = req.cookies?.token 
                        || req.body?.token 
                        || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));


        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try {
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log("DECODE",decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            console.log(err);
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch (error) {  
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isBuyer

exports.isBuyer = (req, res, next) => {
     try {
        if (req.user.accountType !== "buyer")
       {
        return res.status(401).json({
            sucess: false,
            message:"This is protected route for Buyers only"
        })

        }
   
    }
    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            sucess: false,
            message:"User role cannot be verified, please try again"
        })
    }
          next();
}


//isSeller

exports.isSeller = (req, res, next) => {
     try {
        if (req.user.accountType !== "seller")
       {
        return res.status(401).json({
            sucess: false,
            message:"This is protected route for Sellers only"
        })

        }
   
    }
    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            sucess: false,
            message:"User role cannot be verified, please try again"
        })
    }
          next();
}