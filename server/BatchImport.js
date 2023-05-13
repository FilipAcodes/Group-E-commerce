const { MongoClient } = require("mongodb");

const companies = require("./data/companies.json");
const items = require("./data/items.json");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("group-project");
  // await db.collection("companies").insertMany(companies);
  await db.collection("items").insertMany(items);
  client.close();
};

dbImport();
