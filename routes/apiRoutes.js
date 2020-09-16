var cheerio = require("cheerio");
var db = require("../model");
var axios = require('axios');

module.exports = function (app) {
  app.get('/articles', function (req, res) {
        
    axios.get('https://www.arstechnica.com/gadgets/').then(urlResponse =>{
      var $ = cheerio.load(urlResponse.data);
      var results = [];

      $('li.article').each((i, element) =>{
          var link = $(element).find('a.overlay').attr('href');
          var title = $(element).find('a').text().split('    \n')[0];
          var summary = $($(element).find("p.excerpt")[0]).text().trim();

          if (link && title && summary){
              results.push({
                  link: link,
                  title: title,
                  summary: summary
              });
          }
          console.log(results);
      });
    db.Article.create(results).then(function(dbArticle){
          results.render({dbArticle});
          console.log(dbArticle);
      }).catch(function(error){
          console.log(error);
    db.Article.find({}).then(function(dbData){
            console.log(dbData)
            res.json(dbData);
        });
      });
  });

    });


    app.put("/save-article/:articleId", function(req, res) {
        db.Article.findByIdAndUpdate(req.params.articleId, {    $set: { saved: true }
        }).then(function(data) {
            res.json(data);
        });
    });

    app.get("/display-saved/", function(req, res) {
        db.Article.find( 
            { saved: true }
        ).then(function(data) {
            res.json(data);
        });
    });

    app.put("/delete-from-saved/:articleId", function(req, res) {
        db.Article.findByIdAndUpdate(req.params.articleId, {    $set: { saved: false }
        }).then(function(data) {
            res.json(data);
        });
    });

    app.post("/create-note/:articleId", function(req, res) {
        console.log(req.body);
        db.Note.create(req.body)
            .then(function(dbNote) {
                console.log(dbNote._id)
                return db.Article.findOneAndUpdate({_id: req.params.articleId}, { $push: { note: dbNote._id } }, { new: true });
            }).then(function(dbArticle) {
                res.json(dbArticle);
            }).catch(function(err) {
                res.json(err);
        });
    });

    app.get("/show-article-notes/:articleId", function(req, res) {
        db.Article.findById(req.params.articleId)
          .populate("note")
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
      });

      app.delete("/delete-note/:noteId", function (req, res) {
        db.Note.findByIdAndRemove(req.params.noteId, (err, note) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });
};