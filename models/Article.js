// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a ArticleSchema object with the Schema class we've made
var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: "Title is required",
        trim: true
    },
    link: {
        type: String,
        required: "Link is required",
        trim: true,
        unique: true
    },
    comments: [{
        type: Schema.Types. ObjectId,
        ref: "Comment"
    }]
});

// Creat the Article model with our ArticleSchema schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model to be used in server.js
module.exports = Article;