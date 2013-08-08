var request = require("request");
var cheerio = require("cheerio");

request({
  uri: "https://news.google.com/",
}, function(error, response, body) {
  console.log(body)
  var $ = cheerio.load(body);
  var topics = {};
  $("#nav-topic-list").children().each(function() {
    topics[$(this).children("a").text()] = Date.now()
    });
  //write to DB
  });