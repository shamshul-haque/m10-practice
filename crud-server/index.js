const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// database user and password
const uri =
  "mongodb+srv://shamshul-haque:JdNX1xGCAlysKsKm@cluster0.gwehrjf.mongodb.net/?retryWrites=true&w=majority";

// create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // connect client to their sever
    await client.connect();

    // get the data collection
    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    // get operation
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get operation for specific id
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // post operation
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user:", user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // update operation for specific id
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(user);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updatedUser,
        options
      );
      res.send(result);
    });

    // delete operation for specific id
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("please delete:", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // send ping to confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("CRUD server is running...");
});

app.listen(port, () => {
  console.log(`CRUD server is running at port: ${port}`);
});
