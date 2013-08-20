var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
//////////////////////////
/////This is for GURADIAN/
//////////////////////////
	function getURLcnn()
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
		var ttodo = $("a").length;
        console.log(ttodo);
		$("a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(11,15) === "theg")
		  {
			oldhref = myhref;
			tarray.push(myhref);
			//console.log(myfile);
			console.log(myhref);
			i++;
		  }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	}
	  
	function getArticlecnn(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/CNN/CNN_"+tmyfile, "w");
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
		fs.appendFile("Articles/CNN/CNN_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_strycntntlft  div div div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
		  });
		  $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea h1").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
		  });
		  $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_stryathrtmp div").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
		  });
	
		  $("#cnnContainer .cnn_maincntnr .cnn_contentarea .cnn_storyarea .cnn_strycntntlft p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/CNN/CNN_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
	}
	getURLcnn();