var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
//////////////////////////
/////This is for nyt/////
//////////////////////////
	function getURLnyt()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.nytimes.com/",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $(".story a").length;
		$(".story a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref.substring(23,27));
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if(myhref.substring(11,18) === "nytimes" && myhref.substring(23,27) === "2013")
		  {
			oldhref = myhref;
			//myhref = "http://www.cnn.com"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticlenyt(tarray);
			  }
			}
		});
	  });
	}
	  
	function getArticlenyt(array){
	  var j = 0;
	  var filedescriptor = [];
	  console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/NYT/NYT_"+tmyfile, "w");
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
		  
		  
		  k = parseInt(k);
		  //console.log(k);
		//console.log(j);
		var myfile = k.toString()+".txt";
		//console.log(array[j]);
		//console.log(filedescriptor);
		fs.appendFile("Articles/NYT/NYT_"+myfile, array[k]+"\n", function (err) {});
	
		  /*$(".article-artwork img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/NYT/NYT_"+myfile, text, function (err) {});
		  });*/
		  $("#article div h1 nyt_headline").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/NYT/NYT_"+myfile, text, function (err) {});
		  });
		  $("#article div nyt_byline").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
            //console.log(text);
			fs.appendFile("Articles/NYT/NYT_"+myfile, text, function (err) {});
		  });
          $("#article div .dateline").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
            //console.log(text);
			fs.appendFile("Articles/NYT/NYT_"+myfile, text, function (err) {});
		  });
          $("#article div div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
            //console.log(text);
			fs.appendFile("Articles/NYT/NYT_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
	}
	getURLnyt();