const Catalog = require("../Models/Catalog");
const Order = require("../Models/Order");


//Creating a catalog
exports.createCatalog = async (req, res) => {

    try {
        const { items, name } = req.body;
        const id = req.user.id;

        const createdCatalog = await Catalog.create({ seller: id, name: name, products: items });

        return res.status(200).json({
            success: true,
            createdCatalog: createdCatalog
        })

    }

    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating catalog"
        })
    }

};


exports.getOrder = async (req, res) => {
    try {
        const seller_id = req.user.id;

        const existingOrder = Order.find({ seller: seller_id });


        if (!existingOrder)
        {
            return res.json({
                message:"No Order found"
            })
        }

        return res.status(200).json({
            success: true,
            Orders:existingOrder
        })


    }

    catch (e)
    {
        console.log(e);

        return res.status(500).json({
            success: false,
            message:"Error while fetching orders"
            
        })
    }
}
