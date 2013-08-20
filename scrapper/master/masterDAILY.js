var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
//////////////////////////
/////This is for daily////
//////////////////////////
	function getURLdaily()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.nydailynews.com/",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref.substring(11,22));
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(11,22) === "nydailynews" && oldhref !== myhref)
		  {
			oldhref = myhref;
			//myhref = "http://www.daily.com"+myhref;
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
				getArticledaily(tarray);
			  }
			}
		});
	  });
    }
	  
	function getArticledaily(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
        //console.log(tmyfile);
		fd = fs.openSync("Articles/CNN/CNN_"+tmyfile, "w");
		fs.closeSync(fd);
		
		request({
		  uri: array[j] + "?&tldrj=" + j,
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
        //console.log(myfile);
        console.log(array[k]);
		fs.appendFile("Articles/DAILY/DAILY_"+myfile, array[k]+"\n", function (err) {});
	
		  //console.log(array[k]);
		  /*$("div div div div #story div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/DAILY/DAILY_"+myfile, text, function (err) {});
		  });*/
		  $("#story div h1").each(function(element) {
			//console.log("hello2");
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			console.log(text);
			fs.appendFile("Articles/DAILY/DAILY_"+myfile, text, function (err) {});
		  });
		  $("#story div h3").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/DAILY/DAILY_"+myfile, text, function (err) {});
		  });
		  $("#story div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/DAILY/DAILY_"+myfile, text, function (err) {});
		  });
		});
		j++;
        //console.log(j);
	  }
	}
	getURLdaily();