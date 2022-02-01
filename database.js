"use strict";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: "ecommerce",
    username: "root",
    password: "hassaan",
    host: "localhost",
    port: 3306,
    dialect: "mysql",

    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;