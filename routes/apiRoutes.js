var axios = require('axios');
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var express = require('express');
var app = express();

var databaseUrl = 'scraper';
var collections = ['scrapedData'];
var db = mongojs(databaseUrl, collections);

db.on('error', function(error){
    console.log("Database Error: " + error);
});

app.get('/scrape', function(req, res){
    axios.get('https://news.ycombinator.com/').then(function(response){
        var $ = cheerio.load(response.data);
        $('#results').each(function(i, element){
            var title = $(element).children('a').text();
            var link = $(element).children('a').attr('href');
            if (title && link) {
                db.scrapedData.insert({
                    title: title,
                    link: link
                },
                function(err, inserted){
                    if (err){
                        console.log(err);
                    }
                    else {
                        console.log(inserted);
                    }
                });
            }
        });
    });
    res.send('This is working');
});