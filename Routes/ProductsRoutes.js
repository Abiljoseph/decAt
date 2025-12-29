const express = require("express");
const { GetAllProducts } = require("../controllers/productController");
const authMiddileware = require("../middilewares/authMiddileware");

const router = express.Router();

router.get("/",authMiddileware, GetAllProducts);

module.exports = router