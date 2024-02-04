const express = require("express");

const { auth, isSeller, isBuyer } = require("../Middlewares/Auth");
const { signup,login } = require("../Controllers/auth");
const { getSellers, getSellersById, createOrder } = require("../Controllers/Buyers");
const { createCatalog, getOrder } = require("../Controllers/Sellers");

const router = express.Router();

//   Auth routes
router.post("/register", signup);
router.post("/login", login);

// Buyers routes

router.get("/buyer/list-of-sellers", auth, isBuyer, getSellers);
router.get("/buyer/seller-catalog/:seller_id", auth, isBuyer, getSellersById);
router.post("/buyer/create-order/:seller_id", auth, isBuyer, createOrder);

// Sellers routes

router.post("/seller/create-catalog", auth, isSeller, createCatalog);
router.get("/seller/orders", auth, isSeller, getOrder);

module.exports = router;
