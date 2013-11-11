var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
//////////////////////////
/////This is for METRO////
//////////////////////////
	function getURLmetro()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://metronews.ca/",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
        console.log(ttodo);
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  console.log(myhref.substring(0,4));
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,4) === "http")
		  {
			oldhref = myhref;
			//myhref = "http://www.METRO.co.uk"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			console.log(myhref);
			i++;
		  }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here 1");
			  todo--;
              //console.log(todo);
			  if(todo == 0){
				getArticlemetro(tarray);
                //console.log("im here 4");
			  }
			}
		});
	  });
	}
	  
	function getArticlemetro(array){
      //console.log("i made it");
	  var j = 0;
	  var filedescriptor = [];
	  console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/METRO/METRO_"+tmyfile, "w");
		fs.closeSync(fd);
		//console.log(myfile);
		request({
		  uri: array[j] + "?&tldrj=" + j,
		}, function(error, response, body) {
		
		  var $ = cheerio.load(body);
		  
		  var pathname = this.uri.query;
		  
		  //if blank, dont do anything
		  if(!pathname) return;
		  
		  var k = pathname.substring(pathname.indexOf("tldrj=") + 6);
		  //console.log(k);
		  
		  k = parseInt(k);
		
		//console.log(j);
		var myfile = k.toString()+".txt";
		//console.log(array[j]);
		//console.log(filedescriptor);
		fs.appendFile("Articles/METRO/METRO_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  $("#npContentMain .npBlock .npStoryPhoto img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/METRO/METRO_"+myfile, text, function (err) {});
		  });
		  $("#npContentMain .npBlock h1").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/METRO/METRO_"+myfile, text, function (err) {});
		  });
		  $("#npContentMain .npBlock div .npAuthorMeta span").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/METRO/METRO_"+myfile, text, function (err) {});
		  });
		  $("#npContentMain .npBlock .npPostContent div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/METRO/METRO_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
	}
	getURLmetro();