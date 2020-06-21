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

var Users = mongoose.model(
  "Users",
  { _id: String, group: String, data: Object },
  "users"
);
var Groups = mongoose.model(
  "Groups",
  { _id: String, members: Array },
  "groups"
);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Define an endpoint that must be called with an access token
router.get("/authenticate", (req, res) => {
  Users.findById(req.user.sub, (err, user) => {
    var type, data, groupInfo;
    if (user === null) {
      type = "signup";
      data = {};
      groupInfo = {};
      res.json({
        type: type,
        groupInfo: groupInfo,
        data: data,
      });
    } else {
      type = "login";
      data = user.data;
      Groups.findById(user.group, (err, group) => {
        groupInfo = group;
      }).then(() => {
        res.json({
          type: type,
          groupInfo: groupInfo,
          data: data,
        });
      });
    }
  });
});

router.post("/signup", (req, res) => {
  if (req.body.userType === "therapist") {
    var group = new Groups({
      _id: req.user.sub,
      members: [
        {
          name: req.body.name,
          type: req.body.userType,
          condition: req.body.condition,
        },
      ],
    });

    group.save((err, doc) => {
      var user = new Users({
        _id: req.user.sub,
        group: doc._id,
        data: {
          name: req.body.name,
          type: req.body.userType,
          condition: req.body.condition,
        },
      });

      user.save((err, docs) => {
        res.sendStatus(200);
      });
    });
  } else {
    Groups.find({}, (err, groups) => {});

    Groups.findOneAndUpdate(
      { "members.4": { $exists: false } },
      {
        $push: {
          members: {
            name: req.body.name,
            type: req.body.userType,
            condition: req.body.condition,
          },
        },
      },
      { new: true },
      function (err, doc) {
        var user = new Users({
          _id: req.user.sub,
          group: doc._id,
          data: {
            name: req.body.name,
            type: req.body.userType,
            condition: req.body.condition,
          },
        });

        user.save((err, docs) => {
          res.sendStatus(200);
        });
      }
    );
  }
});

http: module.exports = router;
