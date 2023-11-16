const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `${process.env.MONGO_DB_PASSWORD}`;

const dbName = "grove";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = { client, dbName };
