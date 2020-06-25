var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

var app = express();

app.use(cors()); // Accept cross-origin requests from the frontend app
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

// var http = require("http").Server(app);
var http = app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  else console.log("Server listen on port 3000");
});

var io = require("socket.io")(http);

var indexRouter = require("./routes/index")(io);
var usersRouter = require("./routes/users");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/", indexRouter);

// Set up Auth0 configuration
const authConfig = {
  domain: "sneakysensei.us.auth0.com",
  audience: "https://quellchat.herokuapp.com/",
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
app.use("/users", usersRouter);

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
