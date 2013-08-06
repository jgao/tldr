var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

  var j = 0;
  var k = 0;
  var array = fs.readFileSync("temp.txt").toString().split('\n');
  //console.log(array.length);
  while (j<array.length-1)
  {
    //console.log(j);
    var myfile = j.toString()+".txt";
    //console.log(myfile);
    fs.open(myfile, "w");
    request({
      
      uri: array[j],
    }, function(error, response, body) {
      var $ = cheerio.load(body);
      $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_strycntntlft p").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.text();
        fs.appendFile(myfile, text, function (err) {});
      });
    k++;
    });
    j++;
  }