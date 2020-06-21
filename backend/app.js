var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

var mongoose = require("mongoose");
var dbUrl =
  "mongodb+srv://snehil:alienforce@cluster0-wx1mo.mongodb.net/quell?retryWrites=true&w=majority";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors()); // Accept cross-origin requests from the frontend app
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// var http = require("http").Server(app);
var http = app.listen(process.env.PORT || 3001, (err) => {
  if (err) console.error(err);
  else console.log("Server listen on port 3001");
});
var io = require("socket.io")(http);

// Set up Auth0 configuration
const authConfig = {
  domain: "sneakysensei.us.auth0.com",
  audience: "http://localhost:3001",
};

// Define middleware that validates incoming bearer tokens
// using JWKS from sneakysensei.us.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"],
});

app.use(checkJwt);

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("mongodb connected", err);
  }
);

var Messages = mongoose.model(
  "Messages",
  { groupid: String, name: String, text: String },
  "messages"
);

app.get("/messages", function (req, res) {
  const group = decodeURIComponent(req.query.id);
  Messages.find({ groupid: group }, (err, messages) => {
    res.json({ messages: messages });
  });
});

app.post("/messages", function (req, res) {
  //add to db
  //emit db results to all
  var message = new Messages({
    groupid: req.body.groupid,
    name: req.body.name,
    text: req.body.text,
  });
  message.save((err, doc) => {
    if (err) sendStatus(500);
    console.log(doc);
    io.emit("message", doc);
    res.sendStatus(200);
  });
});

io.on("connection", (socket) => {
  console.log("New Client Connected: " + socket);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
