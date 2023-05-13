"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Function that gets all the items in the database
const getAllItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const collectionItems = await db
    .collection("items")
    .aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
    ])
    .toArray();

  client.close();
  res
    .status(200)
    .json({ status: 200, data: collectionItems, message: "All item data" });
};

//Function that gets all the companies in the database
const getAllCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const allComapnies = await db.collection("companies").find().toArray();
  client.close();
  res
    .status(200)
    .json({ status: 200, data: allComapnies, message: "All companies data" });
};

//Function that gets a specific Item in the database
const getSpecificItem = async (req, res) => {
  const { _id } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const specificItem = await db
    .collection("items")
    .findOne({ _id: Number(_id) });

  client.close();
  specificItem
    ? res.status(200).json({
        status: 200,
        data: specificItem,
        message: `Specific Info for Item ${_id}`,
      })
    : res.status(404).json({
        status: 404,
        data: specificItem,
        message: `No items found with ${_id}`,
      });
};
//Function that gets a specific company in the database
const getSpecificCompany = async (req, res) => {
  const { _id } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const specificCompany = await db
    .collection("companies")
    .findOne({ _id: Number(_id) });
  client.close();

  specificCompany
    ? res.status(200).json({
        status: 200,
        data: specificCompany,
        message: `Specific Info for Company ${_id}`,
      })
    : res.status(404).json({
        status: 404,
        data: specificCompany,
        message: `No companies found with ${_id}`,
      });
};

//Function that removes Item completely (trash/delete button)
const deleteItemFromCart = async (req, res) => {
  const { itemId, email } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");

  const user = await db.collection("users").findOne({ _id: email });

  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found." });
  } else {
    const existingItemIndex = user.cartProducts.findIndex(
      (item) => item.itemId === itemId
    );
    if (existingItemIndex === -1) {
      client.close();
      return res.status(404).json({ message: "Item not found in cart." });
    } else {
      user.cartProducts.splice(existingItemIndex, 1);
      await db
        .collection("users")
        .updateOne(
          { _id: email },
          { $set: { cartProducts: user.cartProducts } }
        );
      client.close();
      return res.status(200).json({ message: "Product deleted from cart." });
    }
  }
};

// Function that does +1 to the item, creates and/or finds the user
const addProduct = async (req, res) => {
  const { email, itemId } = req.body;
  if (!email || !itemId) {
    res
      .status(404)
      .json({ status: 404, message: "Email or itemId is missing" });
  }
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const user = await db.collection("users").findOne({ _id: email });
  const product = await db.collection("items").findOne({ _id: itemId });

  if (!user) {
    const price = product.price.replace("$", "");
    await db.collection("users").insertOne({
      _id: email,
      cartProducts: [
        { itemId: itemId, quantity: 1, totalPrice: Number(price) },
      ],
    });
    res.status(200).json({ status: 200, message: "Product added to cart." });
  } else {
    const existingItem = user.cartProducts.find(
      (item) => item.itemId === itemId
    );
    if (existingItem) {
      if (Number(existingItem.quantity) < Number(product.numInStock)) {
        existingItem.quantity++;
        const price = product.price.replace("$", "");
        existingItem.totalPrice =
          Math.round((existingItem.totalPrice + Number(price)) * 100) / 100;
        await db
          .collection("users")
          .updateOne(
            { _id: email },
            { $set: { cartProducts: user.cartProducts } }
          );
        res
          .status(200)
          .json({ status: 200, message: "Product added to cart." });
      } else {
        res.status(404).json({ status: 404, message: "Not more in stock" });
      }
    } else {
      const price = product.price.replace("$", "");
      user.cartProducts.push({
        itemId: itemId,
        quantity: 1,
        totalPrice: Number(price),
      });
      await db
        .collection("users")
        .updateOne(
          { _id: email },
          { $set: { cartProducts: user.cartProducts } }
        );
      res.status(200).json({ status: 200, message: "Product added to cart." });
    }
  }

  client.close();
  //res.status(200).json({status: 200, message: "Product added to cart." });
};

//Function that decrements the product, it also removes it from the db if it reaches 0
const removeProduct = async (req, res) => {
  const { email, itemId } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const user = await db.collection("users").findOne({ _id: email });
  const product = await db.collection("items").findOne({ _id: itemId });

  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found." });
  } else {
    const existingItemIndex = user.cartProducts.findIndex(
      (item) => item.itemId === itemId
    );
    if (existingItemIndex === -1) {
      client.close();
      return res.status(404).json({ message: "Item not found in cart." });
    } else {
      const existingItem = user.cartProducts[existingItemIndex];
      existingItem.quantity--;
      const price = product.price.replace("$", "");
      existingItem.totalPrice =
        Math.round((existingItem.totalPrice - Number(price)) * 100) / 100;
      if (existingItem.quantity === 0) {
        user.cartProducts.splice(existingItemIndex, 1);
      }
      await db
        .collection("users")
        .updateOne(
          { _id: email },
          { $set: { cartProducts: user.cartProducts } }
        );
      client.close();
      return res.status(200).json({ message: "Product removed from cart." });
    }
  }
};
//Get all the users(carts)
const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const allUsers = await db.collection("users").find().toArray();
  client.close();
  res
    .status(200)
    .json({ status: 200, data: allUsers, message: "All user data" });
};
//Get a specific user(cart)
const getSpecificUser = async (req, res) => {
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const specificCompany = await db.collection("users").findOne({ _id: email });
  client.close();

  specificCompany
    ? res.status(200).json({
        status: 200,
        data: specificCompany,
        message: `Specific Info for User ${email}`,
      })
    : res.status(404).json({
        status: 404,
        data: specificCompany,
        message: `No user found with ${email}`,
      });
};
//Function that completes the purchase, removes the User's cart and removes the quantity
// from the database
const completePurchase = async (req, res) => {
  const { email } = req.body;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const cartCollection = client.db("group-project").collection("users");
    const itemsCollection = client.db("group-project").collection("items");

    const cart = await cartCollection.findOne({ _id: email });

    for (const cartItem of cart.cartProducts) {
      const itemId = cartItem.itemId;
      const quantity = cartItem.quantity;

      const item = await itemsCollection.findOne({ _id: itemId });

      item.numInStock -= quantity;

      await itemsCollection.updateOne(
        { _id: itemId },
        { $set: { numInStock: item.numInStock } }
      );
    }

    await cartCollection.updateOne(
      { _id: email },
      { $set: { cartProducts: [] } }
    );

    client.close();

    res
      .status(200)
      .json({ status: 200, message: "Purchase completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
//Initial User Log in cart creation
const initialUserLogin = async (req, res) => {
  const { email } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  const user = await db.collection("users").findOne({ _id: email });

  if (!user) {
    await db.collection("users").insertOne({
      _id: email,
      cartProducts: [],
    });
    res.status(200).json({ status: 200, message: "User cart created!" });
  }
  client.close();
};
module.exports = {
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
};
