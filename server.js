const { Mongoose } = require('mongoose');
var express = require('express');
var app = express();
var port = process.env.port || 3000;
var request = require('request');

require('dotenv').config();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

require('./routes/htmlRoutes');
require('./routes/apiRoutes');

app.listen(port, function(){
    console.log('listening on: ' + port);
});