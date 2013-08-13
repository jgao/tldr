var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

  var myhref = "new";
  var oldhref = "old";
  var i = 0;
  fs.open("BBCtemp.txt", "w");
  ///
  ///This is the section to get the top News stories
  request({
    uri: "http://www.bbc.co.uk/news",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div div div div div div div div div div .other-top-stories-stories li a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.bbc.co.uk"+myhref;
        fs.appendFile("BBCtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        console.log(myhref);
        i++;
      }
    });
    $("div div div div div div div div #features-and-analysis-2 ul li a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.bbc.co.uk"+myhref;
        fs.appendFile("BBCtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        console.log(myhref);
        i++;
      }
    });
  });
  ///
  ///This is the section to get the top sports stories
  request({
    uri: "http://www.bbc.co.uk/sport/0/",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div div div div div div div div div div .other-top-stories-stories li a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.bbc.co.uk"+myhref;
        fs.appendFile("BBCtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        console.log(myhref);
        i++;
      }
    });
    $("div div div div div div div div div div div ul li .link").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.bbc.co.uk"+myhref;
        fs.appendFile("BBCtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        console.log(myhref);
        i++;
      }
    });
  });