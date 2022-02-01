const database = require("../database.js");

const { DataTypes } = require("sequelize");

const Order = database.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Products",
            key: "id",
        },
    },

    stripe_id: {
        type: DataTypes.STRING,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,

        enum: ["paid", "failed"],
    },
});

module.exports = Order;