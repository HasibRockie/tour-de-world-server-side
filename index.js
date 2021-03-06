const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;
app.use(cors());
app.use(express.json());
require('dotenv').config()

app.get("/", (req, res) => {
  res.send("Tour de world is running");
});

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xllaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(process.env.DB_USER, process.env.DB_pass);
console.log(process.env);

async function run() {
  try {
    await client.connect();
    const database = client.db("TourDeWorld");
    const servicesCollections = database.collection("services");
    const userCollections = database.collection("users");

    // post method
    app.post("/services", async (req, res) => {
      const entity = req.body;
      const result = await servicesCollections.insertOne(entity);
      res.json(result);
    });

    // post method for user
    app.post("/users", async (req, res) => {
      console.log(req.body);
      const entity = req.body;
      const result = await userCollections.insertOne(entity);
      res.json(result);
    });

    // post method for users
    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
          $set: {
              user: updatedUser.user,
              cart: updatedUser.cart,
              orders: updatedUser.orders,
              details: updatedUser.details
          },
      };
      const result = await userCollections.updateOne(filter, updateDoc, options)
      console.log(result)
      res.json(result)
  })

    // get method
    app.get("/services", async (req, res) => {
      const cursor = servicesCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // get method for users
    app.get("/users", async (req, res) => {
      const cursor = userCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // get method for single user
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollections.findOne(query)
      res.send(result);
    });

    // get method for single services
    app.get("/services/:service", async (req, res) => {
      const service = req.params.service;
      const query = { _id: ObjectId(service) };
      const result = await servicesCollections.findOne(query)
      res.send(result);
    });

      // DELETE API
      app.delete('/services/:service', async (req, res) => {
        const service = req.params.service;
        const query = { _id: ObjectId(service) };
        const result = await servicesCollections.deleteOne(query);

        res.json(result);
    })



  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("servering running on port:", port);
});
