const models = require("./models");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
// const db = process.env.MONGO_URI;
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const schema = require('./schema/schema');

const app = express();

const path = require("path")

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

if (!db) {
    throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

app.use(cors());

app.use(
    "/graphql",
    expressGraphQL({
      schema,
      graphiql: true
    })
);

module.exports = app;