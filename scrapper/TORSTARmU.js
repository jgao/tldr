var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

  var myhref = "new";
  var oldhref = "old";
  var i = 0;
  fs.open("temp.txt", "w");
  request({
    uri: "http://www.thestar.com/",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div div div div div div div div div div div div a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        //myhref = "http://www.thestar.com"+myhref;
        fs.appendFile("TORSTARtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        console.log(myhref);
        i++;
      }
    });
  });