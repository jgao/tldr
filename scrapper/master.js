var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");


function getURL()
{
  var myhref = "new";
  var oldhref = "old";
  var i = 0;
  fs.open("CNNtemp.txt", "w");
  request({
    uri: "http://www.cnn.com",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("body a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  request({
    uri: "http://www.cnn.com/US/?hpt=sitenav",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  request({
    uri: "http://www.cnn.com/WORLD/?hpt=sitenav",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  request({
    uri: "http://www.cnn.com/POLITICS/?hpt=sitenav",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  request({
    uri: "http://www.cnn.com/JUSTICE/?hpt=sitenav",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  request({
    uri: "http://www.cnn.com/HEALTH/?hpt=sitenav",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  request({
    uri: "http://www.cnn.com/LIVING/?hpt=sitenav",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  request({
    uri: "http://www.cnn.com/TRAVEL/?hpt=sitenav",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
      myhref = $(this).attr("href")+"\n";
      //console.log(myhref);
      /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
      {*/
      if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
      {
        oldhref = myhref;
        myhref = "http://www.cnn.com"+myhref;
        fs.appendFile("CNNtemp.txt", myhref, function (err) {});
        //console.log(myfile);
        //console.log(myhref);
        i++;
      }
    });
  });
  getArticle();
}

function getArticle()
{
  var j = 0;
  var k = 0;
  var array = fs.readFileSync("CNNtemp.txt").toString().split('\n');
  //console.log(array.length);
  while (j<array.length-1)
  {

    var filedescriptor = fs.openSync("Articles/CNN/CNN_"+myfile, "w");
    //console.log(j);
    var myfile = j.toString()+".txt";
    console.log(array[j]);
    console.log(filedescriptor);
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
    fs.closeSync(filedescriptor);
    j++;
  }
}
getURL();