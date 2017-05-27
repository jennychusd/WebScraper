var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

module.exports = function (app) {
    // Simple index route
    app.get("/", function(req, res) {
        res.send(index.html);
    });
    // Route to scrape data from another site
    app.get("/scrape", function (req, res) {
        request("http://www.cnn.com/health", function(error, response, html) {
            var $ = cheerio.load(html);
        })
    });
    // Route to display saved articles
    app.get("/saved", function(req, res) {
        // Find all articles with our Article model
        Article.find({}, function(error, doc) {
            // Send any errors to the browser
            if (error) {
            res.send(error);
            }
            // Or send the doc to the browser
            else {
            res.send(doc);
            }
        });
    });
}