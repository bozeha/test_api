const express = require("express");
const app = express();

const router = express.Router();
const Post = require("./models/Post");

// make images floder public
app.use(express.static("public"));

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//////// for json request
app.use(express.json());
/////// for x-www-form-urlencoded
app.use(express.urlencoded());
/// for secure connection string
require("dotenv/config");

global.status = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

//// connect to db -> must be first !!!
//"mongodb+srv://boze123:1qaz2wsx@cluster0.rf5pp.mongodb.net/fishes?retryWrites=true&w=majority",
mongoose.connect(
  //// this is the db url with user and password encrypted by env
  process.env.DB_CONNECTION,

  { useUnifiedTopology: true },
  () => {
    console.log(
      `connection status : ${status[mongoose.connection.readyState]}`
    );
  }
);

/// routs

/// import routs

const fishesRout = require("./routs/fishes");
const coralsRout = require("./routs/corals");
const loginRout = require("./routs/login");

app.use("/fishes", fishesRout);
app.use("/corals", coralsRout);
app.use("/login", loginRout);

//// on enter main page
app.get("/", (req, res) => {
  res.send("we here at home !!!!");
});

/// on entering posts url

app.get("/posts", (req, res) => {
  res.send("we on posts page !!!!");
});

app.post("/", function (req, res) {
  const post = new Post({
    title: req.body.title,
    sub: req.body.sub,
  });

  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

//// we can run function on entering spasific page
app.use("/functions", () => {
  console.log("we running functions page !!!!!");
});

//// start listening to server

app.listen(4000);
