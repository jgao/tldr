var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

  var j = 0;
  var k = 0;
  var array = fs.readFileSync("CNNtemp.txt").toString().split('\n');
  //console.log(array.length);
  while (j<array.length-1)
  {
    //console.log(j);
    var myfile = j.toString()+".txt";
    console.log(array[j]);
    fs.open("Articles/CNN/CNN_"+myfile, "w");
    //console.log(array[j]);
    fs.appendFile("Articles/CNN/CNN_"+myfile, array[j]+"\n", function (err) {});
    //console.log(myfile);
    request({
      
      uri: array[j],
    }, function(error, response, body) {
      var $ = cheerio.load(body);
      $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_strycntntlft  div div div img").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.attr("src")+"\n";
        //console.log(text);
        fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
      });
      $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea h1").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.text()+"\n";
        console.log(text);
        fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
      });
      $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_stryathrtmp div").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = paragraph.text()+"\n";
        fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
      });

      $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_strycntntlft p").each(function(j) {
        //console.log(j);
        myfile = k.toString()+".txt";
        //console.log(myfile);
        var paragraph = $(this);
        var text = "\n"+paragraph.text()+"\n";
        fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
      });
    k++;
    });
    j++;
  }