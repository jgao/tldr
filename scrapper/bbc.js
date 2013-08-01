var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

request({
  uri: "http://www.bbc.co.uk/news/world-us-canada-23534845",
}, function(error, response, body) {
  var $ = cheerio.load(body);
  var filename = "index.txt"
  $("div div div div div div div .story-body h1").each(function() {
    filename = $(this).text().substring(0,25)+".txt";
    fs.openSync(filename, "w");
    console.log("testing...");
    return filename;
  });
  $("div div div div div div div .story-body p").each(function() {
    var paragraph = $(this);
    var text = paragraph.text();
    console.log(text);
    fs.appendFile(filename, text, function (err) {});
  });
});
