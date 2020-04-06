const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const app = express(); //creating express Application

app.use(cors()); // cors problem solved
app.use(bodyParser.json());

const uri =
  "mongodb+srv://dbUser:Dark@0011@cluster0-37ztz.mongodb.net/test?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true });

app.get("/foods", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("foods"); //databse name redOnion , table or collection name food
    // perform actions on the collection object
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        console.log("successfully inserted");

        res.send(documents); //reding data from post req from body
      }
    });
    console.log("database connected...");

    client.close();
  });
});

app.get("/food/:id", (req, res) => {
  console.log(req.query.sort);

  //dynamic url api
  const id = req.params.id;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("foods");
    // perform actions on the collection object
    collection.find(id).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        console.log("successfully inserted", id);
        // console.log(documents[id]);

        res.send(documents[id]); //reding data from post req from body
      }
    });
    console.log("database connected...");

    client.close();
  });
});

app.post("/placeOrder", (req, res) => {
  const orderDetails = req.body;
  orderDetails.orderTime = new Date();
  // console.log(food);
  // database Connection
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("placeOrder");
    // perform actions on the collection object
    collection.insertOne(orderDetails, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successfully inserted");

        res.send(result.ops[0]);
      }
    });
    console.log("database connected...");

    client.close();
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listining " + port);
}); //listing port number
