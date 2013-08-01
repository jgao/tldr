var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
request({
  uri: "http://www.cnn.com/2013/07/31/us/nba-shectman-obit/index.html?hpt=hp_bn1",
}, function(error, response, body) {
  var $ = cheerio.load(body);
  var filename = "index.txt"
  $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea h1").each(function() {
    filename = $(this).text().substring(0,25)+".txt";
    fs.openSync(filename, "w");
    return filename;
  });
  $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_strycntntlft p").each(function() {
    var paragraph = $(this);
    var text = paragraph.text();
    fs.appendFile(filename, text, function (err) {});
  });
});
