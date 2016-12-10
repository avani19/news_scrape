// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;
// Create article schema
var ArticleSchema = new Schema({
  title: {
    type:String,
    required:true
  },

  link: {
    type:String,
    required:true
  },
  // this only saves one comment's ObjectId
  comment:
    {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
});
// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);
// export the model
module.exports = Article;