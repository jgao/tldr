var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
//////////////////////////
/////This is for GURADIAN/
//////////////////////////
	function getURLguardian()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.theguardian.com/uk",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
        //console.log(ttodo);
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  console.log(myhref.substring(12,16));
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
          if(myhref !== undefined){
		  if (myhref.substring(12,16) === "theg")
		  {
			oldhref = myhref;
			tarray.push(myhref);
			//console.log(myfile);
			console.log(myhref);
			i++;
		  }
          }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticleguardian(tarray);
			  }
			}
		});
	  });
	}
	  
	function getArticleguardian(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/GUARDIAN/GUARDIAN_"+tmyfile, "w");
		fs.closeSync(fd);
		//console.log(myfile);
		request({
		  uri: array[j] + "&tldrj=" + j,
		}, function(error, response, body) {
		
		  var $ = cheerio.load(body);
		  
		  var pathname = this.uri.query;
		  
		  //if blank, dont do anything
		  if(!pathname) return;
		  
		  var k = pathname.substring(pathname.indexOf("tldrj=") + 6);
		  console.log(k);
		  
		  k = parseInt(k);
		
		//console.log(j);
		var myfile = k.toString()+".txt";
		//console.log(array[j]);
		//console.log(filedescriptor);
		fs.appendFile("Articles/GUARDIAN/GUARDIAN_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  $("#content #atricle-wrapper #main-content-picture img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/GUARDIAN/GUARDIAN_"+myfile, text, function (err) {});
		  });
		  $("#article-header #main-article-info h1").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/GUARDIAN/GUARDIAN_"+myfile, text, function (err) {});
		  });
		  $("#content ul li").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/GUARDIAN/GUARDIAN_"+myfile, text, function (err) {});
		  });
		  $("#content #article-wrapper #article-body-blocks p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/GUARDIAN/GUARDIAN_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
	}
	getURLguardian();