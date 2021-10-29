const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tour de world is running");
});

// PerosonalDiary
// 6duW9uZ7gbAmMiEf

// const uri =
//   "mongodb+srv://PerosonalDiary:6duW9uZ7gbAmMiEf@cluster0.6bqvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

async function run() {
  try {
    // await client.connect();
    // const database = client.db("notes");
    // const NoteCollections = database.collection("NoteCollections");

    // post method  
    // app.post("/notes", async (req, res) => {
    //   const entity = req.body;
    //   const result = await NoteCollections.insertOne(entity);
    //   res.json(result)
    // });

    // get method 
    // app.get('/notes', async(req,res)=> {
    //     const cursor =  NoteCollections.find({});
    //     const result = await cursor.toArray()
    //     res.send(result)
    // })

  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("servering running on port:", port);
});
