var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

  var j = 0;
  var k = 0;
  var array = fs.readFileSync("BBCtemp.txt").toString().split('\n');
  //console.log(array.length);
  while (j<array.length-1)
  {
    //console.log(j);
    var myfile = j.toString()+".txt";
    //console.log(myfile);
    fs.open("Articles/BBC/BBC_"+myfile, "w");
    request({
      
      uri: array[j],
    }, function(error, response, body) {
      var $ = cheerio.load(body);
      $("div div div div div div div div .story-body .story-date span").each(function() {
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.text()+"\n";
        //console.log(text);
        fs.appendFile("Articles/BBC/BBC_"+myfile, text, function (err) {});
      });
      $("div div div div div div div div .story-body h1").each(function() {
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.text()+"\n";
        //console.log(text);
        fs.appendFile("Articles/BBC/BBC_"+myfile, text, function (err) {});
      });
      $("div div div div div div div div .story-body p").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.text();
        fs.appendFile("Articles/BBC/BBC_"+myfile, text, function (err) {});
      });
    k++;
    });
    j++;
  }