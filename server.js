const { Mongoose } = require('mongoose');
var express = require('express');
var logger = require('logger');
var app = express();
var port = process.env.port || 3000;


require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/RoboNmongo';
Mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.listen(port, function(){
    console.log('listening on: ' + port);
});