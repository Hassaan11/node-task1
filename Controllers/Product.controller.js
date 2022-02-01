const Product = require("../models/Products.models");

const express = require("express");

const expressAsyncHandler = require("express-async-handler");

const ProductController = express.Router();

const seed = [{
        id: 1,
        title: "Laptop",
        description: "This is a laptop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgjRR6zJbpiFcbPm-jMzw5y5138kZyMkf0Rg&usqp=CAU",
        price: 1000,
    },
    {
        id: 2,
        title: "Laptop2",
        description: "This is a laptop2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5uqFUEiKZNCSKv8J6p6gZro68Ml_vwU-sjQ&usqp=CAU",
        price: 1000,
    },
    {
        id: 3,
        title: "Laptop3",
        description: "This is a laptop3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSc1Anhe7OJsqfAwBhPepO-BFe1YxPO2MiQ&usqp=CAU",
        price: 1000,
    },
];

ProductController.get(
    "/insert",

    expressAsyncHandler(async(req, res) => {
        console.log("insert");
        Product.bulkCreate(seed).then(() =>
            console.log("Products data have been saved")
        );
    })
);

ProductController.get("/", async(req, res) => {
    console.log("insert");
    const products = await Product.findAll();
    res.render("products", { products });
});

ProductController.get("/products/:id", async(req, res) => {
    const { id } = req.params;
    const products = await Product.findOne({
        where: { id: id },
    });
    res.render("details", { products });
});

module.exports = ProductController;