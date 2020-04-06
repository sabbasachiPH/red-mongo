const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//DATABASE CONNECTION
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect((err) => {
//   const collection = client.db("redOnion").collection("allMenu");

//   try {
//     collection.insertOne({});
//   } catch (e) {
//     print(e);
//   }
//   client.close();
// });

//GET
app.get("/showAllmenu", (req, res) => {
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("allMenu");
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });
  });

  console.log("Database Connected ...");
  client.close();
  //   res.send("Thankyou for calling me");
});

//POST
app.post("/addMenu", (req, res) => {
  const menuDetail = req.body;
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("allMenu");
    collection.insertOne(menuDetail, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    console.log("Database Connected ...");
    client.close();
  });
  console.log("Post Req Send");
  console.log("Data Received", req.body);
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log("Listening from prot 4200 ...."));
