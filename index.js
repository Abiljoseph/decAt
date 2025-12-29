const express = require("express");
const AuthRoutes = require("./Routes/authRoutes");
const ProductRoutes = require("./Routes/ProductsRoutes");
const { connectDB } = require("./config/db");
const path = require("path");
const { title } = require("process");
var cors = require('cors')
require('dotenv').config()

const server = express();
const PORT = 3000;
connectDB();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname,"views"));

server.use(express.static("public"));
server.use(express.json());
server.use(cors())

server.use((err,req,res,next) => {
  console.log(err.stack)
  res.status(500).json({
    success: false,
    message: err.message
  })
})

server.use("/auth",AuthRoutes)
server.use("/product",ProductRoutes)

server.get("/", (req,res) => {
  res.render("pages/home", {title:"Home page", name: "Abil"});
});

server.get("/about", (req,res) => {
  res.render("pages/about", {title:"About page"}) 
})

server.listen(PORT, () => {
    console.log(`server is rinning on port ${PORT}`)
})
