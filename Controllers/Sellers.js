const Catalog = require("../Models/Catalog");
const Order = require("../Models/Order");
const Product = require("../Models/Product");


//Creating a catalog
exports.createCatalog = async (req, res) => {

    try {
        const { items, name } = req.body;
        const id = req.user.id;

        //Creating a catalog with empty products
         let createdCatalog = await Catalog.create({ seller: id, name: name, products: [] });


        //Creating every product and pushing it into the Catalog
          for (const item of items) {
        const createdProduct = await Product.create({ name: item.name, price: item.price, catalog: createdCatalog._id });
        createdCatalog.products.push(createdProduct);
    }

    // Save the updated catalog with the new products
    await createdCatalog.save();
        
        
        return res.status(200).json({
            success: true,
            message: "Catalog created successfully",
            createdCatalog
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

        const existingOrder =await Order.find({ seller: seller_id });


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
