
var express = require('express');
var app = express();
var port = process.env.port || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.listen(port, function(){
    console.log('listening on: ' + port);
});