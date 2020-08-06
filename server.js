
var express = require('express');
var mongojs = require('mongojs');
var axios = require('axios');
var cheerio = require('cheerio');
var dbUrl = 'scraper';
var collections = 'scrapedData';

var app = express();
var port = process.env.port || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

var db = mongojs(dbUrl, collections);

db.on('error', function(error){
    console.log('Database Error: ', error);
});

app.get('/', function(req, res){
    res.send('Is this working???');
});

// Include Paths
/* 3X   app.get('PATH', function(req, res){
db.'database'.'call'(), function(error, found){
    if (error) {
        console.log(error);
    }
    else {
        res.json(found);
    }
}
});
*/

app.get('/scrape', function(request, response){
    axios.get('https://www.nytimes.com/section/us').then(function(response){
        var $ = cheerio.load(response.data);
        $('.title').each(function(i, element){
            var title = $(element).children('a').text();
            var link = $(element).children('a').attr('href');

            if (title && link) {
                db.scrapeData.insert({
                    title: title,
                    link: link
                },
                function(error, inserted){
                    if (error){
                        console.log(error);
                    }
                    else {
                        console.log(inserted);
                    }
        });
    }
    });
});
response.send('Scrape Complete');
});

app.listen(port, function(){
    console.log('listening on: ' + port);
});