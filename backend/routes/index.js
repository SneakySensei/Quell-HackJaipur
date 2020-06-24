var express = require("express");
var path = require("path");
var router = express.Router();
var mongoose = require("mongoose");

const aposToLex = require("apos-to-lex-form");
const natural = require("natural");
const SpellCorrector = require("spelling-corrector");
const sw = require("stopword");

var dbUrl =
  "mongodb+srv://snehil:" +
  process.env.DB_PASS +
  "@cluster0-wx1mo.mongodb.net/quell?retryWrites=true&w=majority";

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

router.get("/messages", function (req, res) {
  const group = decodeURIComponent(req.query.id);
  Messages.find({ groupid: group }, (err, messages) => {
    res.json({ messages: messages });
  });
});

const botMessages = [
  "What else do you feel? Tell me more.",
  "Tell me about a time when you were not experiencing these difficulties.",
  "What energizes you and makes you feel more upbeat?",
  "How do you get yourself out of a bad mood?",
  "Tell me about the important relationships in your life.",
  "What was it like growing up in your family?",
  "How often do you get to meet up with friends?",
  "How are you sleeping these days?",
  "Tell me about your day.",
  "Do you have a pet?",
  "When was the last time you went out with friends?",
];

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("New Client Connected: " + socket);
  });

  router.post("/messages", function (req, res) {
    //add to db
    //emit db results to all
    var message = new Messages({
      groupid: req.body.groupid,
      name: req.body.name,
      text: req.body.text,
    });
    message.save((err, doc) => {
      if (err) sendStatus(500);
      io.emit("message", doc);
    });
    var rawInput = "";
    Messages.find({ groupid: req.body.groupid }, (err, messages) => {
      messages.forEach((message) => {
        rawInput += message.text + " ";
      });
      const parsedInput = aposToLex(rawInput)
        .toLowerCase()
        .replace(/[^a-zA-Z\s]+/g, " ");
      const { WordTokenizer } = natural;
      const tokenizer = new WordTokenizer();
      const tokenizedReview = tokenizer.tokenize(parsedInput);

      const spellCorrector = new SpellCorrector();
      spellCorrector.loadDictionary();
      tokenizedReview.forEach((word, index) => {
        tokenizedReview[index] = spellCorrector.correct(word);
      });
      const filteredReview = sw.removeStopwords(tokenizedReview);
      const { PorterStemmer, SentimentAnalyzer } = natural;
      const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
      const analysis = analyzer.getSentiment(filteredReview);
      if (analysis < 0.4) {
        var bot = new Messages({
          groupid: req.body.groupid,
          name: "Quell Bot ❤",
          text: botMessages[Math.floor(Math.random() * botMessages.length)],
        });
        bot.save((err, doc) => {
          if (err) sendStatus(500);
          io.emit("message", doc);
        });
      }
    });
  });

  return router;
};
