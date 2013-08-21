var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
//////////////////////////
/////This is for bbc//////
//////////////////////////
	function getURLbbc()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.bbc.co.uk",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
          if(myhref !== undefined){
		  if (myhref.substring(0,1) === '/' && oldhref !== myhref)
		  {
			oldhref = myhref;
			myhref = "http://www.bbc.co.uk"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }}
			//console.log(ttodo);
			if(ttodo == 0){
			  console.log("im here 1");
			  todo--;
              console.log(todo);
			  if(todo == 0){
				getArticlebbc(tarray);
                console.log("im here 4");
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.bbc.co.uk/news",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div div div div div div div div div div .other-top-stories-stories li a").length;
		$("div div div div div div div div div div .other-top-stories-stories li a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.bbc.co.uk"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
			//console.log(ttodo);
			if(ttodo == 0){
			  console.log("im here 2");
			  todo--;
              console.log(todo);
			  if(todo == 0){
				getArticlebbc(tarray);
                console.log("im here 5");
			  }
			}
		});
	  });
	  
	  /*todo++;
	  request({
		uri: "http://www.bbc.co.uk/sport/0/",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.bbc.co.uk"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
			//console.log(ttodo);
			if(ttodo == 0){
			  console.log("im here 3");
			  todo--;
              console.log(todo);
			  if(todo == 0){
				getArticlebbc(tarray);
                console.log("im here 6");
			  }
			}
		});
	  });*/
	}
	  
	function getArticlebbc(array){
      console.log("i made it");
	  var j = 0;
	  var filedescriptor = [];
	  console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/BBC/BBC_"+tmyfile, "w");
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
		  console.log(k);
		  
		  k = parseInt(k);
		
		//console.log(j);
		var myfile = k.toString()+".txt";
		//console.log(array[j]);
		//console.log(filedescriptor);
		fs.appendFile("Articles/BBC/BBC_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  $("div div div div div div div div .story-body img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/BBC/BBC_"+myfile, text, function (err) {});
		  });
		  $("div div div div div div div div .story-body h1").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			console.log(text);
			fs.appendFile("Articles/BBC/BBC_"+myfile, text, function (err) {});
		  });
		  $("div div div div div div div div .story-body .story-date span").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/BBC/BBC_"+myfile, text, function (err) {});
		  });
	
		  $("div div div div div div div div .story-body p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/BBC/BBC_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
	}
	getURLbbc();