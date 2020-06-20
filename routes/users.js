var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var dbUrl =
  "mongodb+srv://snehil:alienforce@cluster0-wx1mo.mongodb.net/quell?retryWrites=true&w=majority";

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("mongodb connected", err);
  }
);

var Message = mongoose.model("Message", { name: String, message: String });

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Define an endpoint that must be called with an access token
router.get("/authenticate", (req, res) => {
  console.log(req.user.sub);
  res.json({
    response: "Authenticated!",
    user: req,
  });
});

module.exports = router;
