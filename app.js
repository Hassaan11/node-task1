const express = require("express");

const path = require("path");
const app = express();
const database = require("./database.js");
const SyncTables = require("./models/SyncTables");
const bodyParser = require("body-parser");
const ProductController = require("./Controllers/Product.controller");
const stripe = require("stripe")(process.env.StripeKey);

const Order = require("./models/Order.models");
const dotenv = require("dotenv");
dotenv.config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
SyncTables();

app.use("/", ProductController);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
app.get("/success", function(req, res) {
    res.render("success");
});

app.post("/charge/:id", async(req, res) => {
    res.header("Access-Control-Allow-Origin: *");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    console.log("req.body", req.body);
    let price = req.body.product.amount * 100;

    stripe.charges
        .create({
            amount: price,
            source: req.body.stripeTokenId,
            currency: "inr",
        })
        .then(async function(data) {
            console.log(data.id);
            console.log("Charge Successful");
            const order = await Order.create({
                product_id: parseInt(req.body.product.id),

                stripe_id: data.id,
                status: data.status === "succeeded" ? "paid" : "failed",
                total: parseInt(req.body.product.amount),
            });
            res.send({
                message: "Successfully purchased items",
                details: {
                    id: parseInt(req.body.product.id),
                    total: parseInt(req.body.product.amount),
                    image: req.body.product.image,
                    title: req.body.product.title,
                    method: "Stripe",
                },
            });
        })
        .catch(async function(e) {
            console.log("Charge Fail");
            console.log(e);
            const order = await Order.create({
                product_id: parseInt(req.body.product.id),

                stripe_id: e.id,
                status: e.status === "succeeded" ? "paid" : "failed",
                total: parseInt(req.body.product.amount),
            });
            res.status(500).end();
        });
});

app.listen(3000, () => {
    console.log("Listning at port 3000");
});