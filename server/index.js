"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getAllItems,
  getAllCompanies,
  getSpecificItem,
  getSpecificCompany,
  deleteItemFromCart,
  addProduct,
  removeProduct,
  getAllUsers,
  getSpecificUser,
  completePurchase,
  initialUserLogin,
} = require("./handlers");
const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/api-getitems", getAllItems)
  .get("/api-getcompanies", getAllCompanies)
  .get("/item/:_id", getSpecificItem)
  .get("/users", getAllUsers)
  .get("/company/:_id", getSpecificCompany)
  .get("/specificuser", getSpecificUser)
  .get("/users", getAllUsers)
  .get("/cart/:email", getSpecificUser)

  .post("/addproduct", addProduct)
  .post("/createuser", initialUserLogin)

  .delete("/removeproduct", removeProduct)
  .delete("/deleteproduct", deleteItemFromCart)
  .delete("/completepurchase", completePurchase)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
