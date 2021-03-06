require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const favicon = require('express-favicon')

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'server.js'));
});

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraperNews';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("Connected to Mongoose!");
// });

app.listen(PORT, function () {
    console.log('Listening on : ' + PORT);
});