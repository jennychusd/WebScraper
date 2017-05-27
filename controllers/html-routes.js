var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

module.exports = function (app) {
    // Root populates all saved articles
    app.get("/", function(req, res) {
        Article.find().populate("comments").exec(function(error, found) {
            if (error) {
                res.end();
            }
            else {
                res.render("index", {articles: found})
            }
        })
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
        res.send("saved");
        // res.redirect("/");
    });
    // Route to post comments
    app.post("/comment", function (req, res) {
        var saveComment = new Comment({text: req.body.comment});
        saveComment.save(function(error, doc) {
            if (error) {
                res.send(error);
            }
            else {


                Article.findOneAndUpdate({}, {$push: {"comments": doc._id}}, {new: true}, function(error, newdoc) {
                    if (error) {
                        res.send(error);
                    }
                    else {
                        console.log(newdoc);
                        res.redirect("/");
                    }
                });

                
            }
        })
    })

}