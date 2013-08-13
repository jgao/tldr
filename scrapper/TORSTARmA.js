var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

  var j = 0;
  var k = 0;
  var array = fs.readFileSync("TORSTARtemp.txt").toString().split('\n');
  //console.log(array.length);
  while (j<array.length-1)
  {
    //console.log(j);
    var myfile = j.toString()+".txt";
    //console.log(myfile);
    fs.open("Articles/TORSTAR/TORSTAR_"+myfile, "w");
    request({
      
      uri: array[j],
    }, function(error, response, body) {
      var $ = cheerio.load(body);
      $(".article-artwork img").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.attr("src")+"\n";
        fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, text, function (err) {});
      });
      $(".article-authors").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.text();
        fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, text, function (err) {});
      });
      $(".article-story-body .body .text p").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = "\n"+paragraph.text()+"\n";
        fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, text, function (err) {});
      });
    k++;
    });
    j++;
  }