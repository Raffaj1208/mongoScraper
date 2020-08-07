var axios = require('axios');
var cheerio = require('cheerio');
var db = require('../models');

var dbUrl = 'scraper';
var collections = 'scrapedData';
var db = mongojs(dbUrl, collections);

db.on('error', function(error){
    console.log('Database Error: ', error);
});

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
