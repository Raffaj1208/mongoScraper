var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: mongoose.SchemaType.Types.ObjectId,
        ref: 'Note'
    }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;