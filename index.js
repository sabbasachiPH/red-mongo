const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(cors());
app.use(bodyParser.json());

//DATABASE CONNECTION
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//GET
app.get("/showAllAppointments", (req, res) => {
  let client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("doctor-portal").collection("appointment");
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });
  });

  console.log("Database showAllAppointments Connected ...");
  client.close();
  //   res.send("Thankyou for calling me");
});

//POST
app.post("/addAppointment", (req, res) => {
  const serviceDetail = req.body;
  let client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("doctor-portal").collection("appointment");
    collection.insertOne(serviceDetail, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    console.log("Database addService Connected ...");
    //client.close();
  });
  console.log("Post Req Send");
  console.log("Data Received", req.body);
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log("Listening from port 4200 ...."));
