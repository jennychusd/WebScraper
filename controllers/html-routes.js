var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

module.exports = function (app) {
    // Simple index route
    app.get("/", function(req, res) {
        res.render("index");
    });
    // Route to scrape data from another site
    app.get("/scrape", function (req, res) {
        request("http://www.cnn.com/health", function(error, response, html) {
            if (error) {
                console.log(error)
            }
            var $ = cheerio.load(html);
            $(".cd__headline").each(function(i, element) {
                var headline = $(this).children("a").text();
                var link = $(this).children("a").attr("href");
            
                if (headline && link) {
                    var saveArticle = new Article({headline: headline, link: link});
                    saveArticle.save(function(error, saved) {
                        if (error) {
                            console.log(error)
                        }
                    })
                }
            })
        })
        res.redirect("/");
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