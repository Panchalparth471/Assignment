const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const { findOne } = require("../Models/Product");
require("dotenv").config();

//Signup

exports.signup = async (req, res) => {
    try {
        const { username, password, confirmPassword, email, accountType } = req.body;
        if (!username || !password || !email || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
    
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords didnt matched"
            })
        }
    
        //Find if user already exists

        const existingUser = await findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Registered"
            })
        }
    
        //Hashing password

        let hashedPassword;
        hashedPassword = await bcrpyt.hash(password, 10);
    

        const user = await User.create({
            email: email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            username: username,
            accountType: accountType
        
        })

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user
        })
    }
    
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error during signup"
        })
    }
};


//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        const user = await User.findOne({ email: email });

        // If user not found with provided email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            });
        }

        if (await bcrpyt.compare(password, user.password)) {
            let token = jwt.sign(
                { email: user.email, id: user._id, accountType: user.accountType },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );


            // Save token to user document in database
            user.token = token;
            user.password = undefined;
            
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
            
        }
        
        else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    }

    catch (e) {
        console.log(e);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }


};