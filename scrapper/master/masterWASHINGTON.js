var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
//////////////////////////
///This is for WASHINGTON/
//////////////////////////
	function getURLwashington()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.washingtonpost.com/",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
        console.log(ttodo);
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref.substring(0,1));
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
          if (myhref !== undefined){
		  if (myhref.substring(0,1) === "/" && myhref.substring(0,7) !== "/posttv" && oldhref !== myhref)
		  {
			oldhref = myhref;
			myhref = "http://www.washingtonpost.com"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }}
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here 1");
			  todo--;
              //console.log(todo);
			  if(todo == 0){
				getArticlewashington(tarray);
                //console.log("im here 4");
			  }
			}
		});
	  });
	}
	  
	function getArticlewashington(array){
      //console.log("i made it");
	  var j = 0;
	  var filedescriptor = [];
	  console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/WASHINGTON/WASHINGTON_"+tmyfile, "w");
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
		//console.log(array[k]);
		//console.log(filedescriptor);
		fs.appendFile("Articles/WASHINGTON/WASHINGTON_"+myfile, array[k]+"\n", function (err) {});
	
		  //console.log("hey");
		  /*$("div div div div div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/WASHINGTON/WASHINGTON_"+myfile, text, function (err) {});
		  });*/
		  $("#content #article-leaf-page div h1 .entry-title").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			console.log(text);
			fs.appendFile("Articles/WASHINGTON/WASHINGTON_"+myfile, text, function (err) {});
		  });
          $("#content #article-leaf-page div div h3 span").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/WASHINGTON/WASHINGTON_"+myfile, text, function (err) {});
		  });
		  $("#content #article-leaf-page div #article #article_body div article p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/WASHINGTON/WASHINGTON_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
	}
	getURLwashington();