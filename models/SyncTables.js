const Product = require("./Products.models");
const Order = require("./Order.models");

module.exports = async() => {
    await Promise.all([Product.sync(), Order.sync()]);
    return true;
};