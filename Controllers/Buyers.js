const User = require("../Models/User");
const Catalog = require("../Models/Catalog");
const Order = require("../Models/Order");
//Controller for fetching all Users

exports.getSellers = async (req, res) => {
    try {

        const sellers = await User.find({ accountType: "seller" });

        // Extract necessary fields
        const sellerList = sellers.map(seller => {
            return {
                id: seller._id,
                username: seller.username,
                email:seller.email
              
            };
        });


        return res.status(200).json({
            success: true,
            message: "List Fetched Successfully",
            sellerList
        })


    }

    catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error in fetching list of sellers"
        })

    }
};

exports.getSellersById = async (req, res) => {
    try {
        const { seller_id } = req.params;

        if (!seller_id)
        {
            return res.status(401).json({
                success: false,
                message:"Please provide a seller id"
            })
        }

        const seller = await Catalog.findOne({ seller: seller_id }).populate("products");
        if (!seller) {
            return res.status(400).json({
                success: false,
                message: "Please input the seller id"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Catalog fetched successfully",
            data: seller
        })

    }

    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error in fetching Catalog"
        })
    }
};


exports.createOrder = async (req, res) => {
    try {
        const { seller_id } = req.params;
        const { items } = req.body;

        if (!seller_id || !items)
        {
            return res.status(400).json({
                success: false,
                message:"All fields are requried"
            })
        }

        const seller = await User.findOne({ _id: seller_id, accountType:"seller" });
        if (!seller)
        {
            return res.status(400).json({
                success: false,
                message:"Enter a valid seller id"
            })
        }

        const catalog = await Catalog.findOne({ seller: seller_id }).populate("products");

        //check if all items provided is sold by the seller
        const validItems = items.filter(item => catalog.products.some(product => product.name == item.name && product.price == item.price));

        // If some items are not found in the catalog, return error
        if (validItems.length !== items.length) {
        return res.status(400).json({
            success:false,
            message: "Some items are not available in the seller's catalog"
        });
        }
        
        //For all the matching items add their product ids in the productIds
        const productIds = validItems.map(item => catalog.products.some(product => product.name == item.name && product.price == item.price)._id);
        const newOrder = await Order.create({ buyer:req.user.id, seller, products: productIds });
        
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            createdOrder:newOrder
        })
    }

    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            success: false,
            message:"Something went wrong while creating order"
        })
    }

    
}
