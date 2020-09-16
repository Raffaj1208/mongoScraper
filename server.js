require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraper_news';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://userdb:password01@cluster0.hl9yc.mongodb.net/scraperNews?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.listen(PORT, function () {
    console.log('Listening on : ' + PORT);
});