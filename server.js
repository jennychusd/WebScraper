// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

var app = express();

var PORT = process.env.PORT || 8080;

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_9fz5g41x:nt258569f5v4r03q0t13nlm561@ds155201.mlab.com:55201/heroku_9fz5g41x");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

require("./controllers/html-routes.js")(app);

app.listen(PORT, function(){
	console.log("App running on port " + PORT);
});