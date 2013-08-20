var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var todo = 0;
getURLbbc();
//////////////////////////
/////This is for bbc//////
//////////////////////////
	function getURLbbc()
	{
      todo=0;
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
			  //console.log("im here 1");
			  todo--;
              //console.log(todo);
			  if(todo == 0){
				getArticlebbc(tarray);
                //console.log("im here 4");
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
			  //console.log("im here 2");
			  todo--;
              //console.log(todo);
			  if(todo == 0){
				getArticlebbc(tarray);
                //console.log("im here 5");
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
			  //console.log("im here 3");
			  todo--;
              //console.log(todo);
			  if(todo == 0){
				getArticlebbc(tarray);
                //console.log("im here 6");
			  }
			}
		});
	  });*/
	}
	  
	function getArticlebbc(array){
      //console.log("i made it");
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
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
		  //console.log(k);
		  
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
			//console.log(text);
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
      getURLcnn();
	}
//////////////////////////
/////This is for cnn//////
//////////////////////////
	function getURLcnn()
	{
      todo=0;
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com/US/?hpt=sitenav",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").length;
		$("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com/WORLD/?hpt=sitenav",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").length;
		$("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com/POLITICS/?hpt=sitenav",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").length;
		$("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com/JUSTICE/?hpt=sitenav",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").length;
		$("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com/HEALTH/?hpt=sitenav",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").length;
		$("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com/LIVING/?hpt=sitenav",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").length;
		$("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
				getArticlecnn(tarray);
			  }
			}
		});
	  });
	  
	  todo++;
	  request({
		uri: "http://www.cnn.com/TRAVEL/?hpt=sitenav",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").length;
		$("div #cnn_maincntnr .cnn_contentarea #cnn_maintoplive a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(0,1) === '/' && myhref.substring(0,6) !== "/video")
		  {
			oldhref = myhref;
			myhref = "http://www.cnn.com"+myhref;
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
		  //console.log(k);
		  
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
      getURLglobe();
	}
//////////////////////////
/////This is for globe////
//////////////////////////
	function getURLglobe()
	{
      todo=0;
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.theglobeandmail.com",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body  div div div div div a").length;
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if(myhref.substring(11,26) === 'theglobeandmail')
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
				getArticleglobe(tarray);
			  }
			}
		});
	  });
	}
	  
	function getArticleglobe(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/GLOBE/GLOBE_"+tmyfile, "w");
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
		fs.appendFile("Articles/GLOBE/GLOBE_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  $("figure img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/GLOBE/GLOBE_"+myfile, text, function (err) {});
		  });
		  $("div .entry-title").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/GLOBE/GLOBE_"+myfile, text, function (err) {});
		  });
		  $("div .entry-meta").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/GLOBE/GLOBE_"+myfile, text, function (err) {});
		  });
	
		  $("div .column-2 p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/GLOBE/GLOBE_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
      getURLstar();
	}
//////////////////////////
/////This is for star/////
//////////////////////////
	function getURLstar()
	{
      todo=0;
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.thestar.com/",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $(".headline").length;
		$(".headline").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href")+"\n";
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if(myhref.substring(11,18) === "thestar")
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
				getArticlestar(tarray);
			  }
			}
		});
	  });
      
      todo++;
	  request({
		uri: "http://www.thestar.com/",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $(".headline a").length;
		$(".headline a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref);
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if(myhref.substring(11,18) === "thestar")
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
				getArticlestar(tarray);
			  }
			}
		});
	  });

	}
	  
	function getArticlestar(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/TORSTAR/TORSTAR_"+tmyfile, "w");
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
		fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  $(".article-artwork img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, text, function (err) {});
		  });
		  $(".article-headline h1").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, text, function (err) {});
		  });
		  $(".article-authors").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, text, function (err) {});
		  });
	
		  $(".article-story-body .body .text p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/TORSTAR/TORSTAR_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
    getURLpost();
	}
//////////////////////////
/////This is for POST//////
//////////////////////////
	function getURLpost()
	{
      todo=0;
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.nationalpost.com/index.html",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("h2 a").length;
		$("h2 a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref.substring(11,12));
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
		  if (myhref.substring(11,12) !== ".")
		  {
			oldhref = myhref;
			//myhref = "http://www.POST.co.uk"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here 1");
			  todo--;
              //console.log(todo);
			  if(todo == 0){
				getArticlepost(tarray);
                //console.log("im here 4");
			  }
			}
		});
	  });
	}
	  
	function getArticlepost(array){
      //console.log("i made it");
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/POST/POST_"+tmyfile, "w");
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
		fs.appendFile("Articles/POST/POST_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  $("#npContentMain .npBlock .npStoryPhoto img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/POST/POST_"+myfile, text, function (err) {});
		  });
		  $("#npContentMain .npBlock h1").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/POST/POST_"+myfile, text, function (err) {});
		  });
		  $("#npContentMain .npBlock div .npAuthorMeta span").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/POST/POST_"+myfile, text, function (err) {});
		  });
		  $("#npContentMain .npBlock .npPostContent div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/POST/POST_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
    getURLrecord()
	}
//////////////////////////
/////This is for RECORD///
//////////////////////////
	function getURLrecord()
	{
      todo=0;
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://therecord.com",
	  }, function(error, response, body) {
		var $ = cheerio.load(body);
		var tarray = array;
		var ttodo = $("body a").length;
        //console.log(ttodo);
		$("body a").each(function(i) {
		  ttodo--;
		  myhref = $(this).attr("href");
		  //console.log(myhref.substring(0,1));
		  /*if (myhref.substring(0,4) !== 'http' && myhref.substring(0,6) !== '/video' && myhref !== oldhref && myhref !== '')
		  {*/
          if (myhref !== undefined){
		  if (myhref.substring(0,1) === "/" )
		  {
			oldhref = myhref;
			myhref = "http://www.therecord.com"+myhref;
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
				getArticlerecord(tarray);
                //console.log("im here 4");
			  }
			}
		});
	  });
	}
	  
	function getArticlerecord(array){
      //console.log("i made it");
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
		fd = fs.openSync("Articles/RECORD/RECORD_"+tmyfile, "w");
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
		fs.appendFile("Articles/RECORD/RECORD_"+myfile, array[k]+"\n", function (err) {});
	
		  
		  /*$(".imgBlock img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/RECORD/RECORD_"+myfile, text, function (err) {});
		  });*/
		  $("#dnn_ctr11783_ModuleContent div h1").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/RECORD/RECORD_"+myfile, text, function (err) {});
		  });
		  $("#dnn_ctr11783_ModuleContent div div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/RECORD/RECORD_"+myfile, text, function (err) {});
		  });
		});
		j++;
	  }
    getURLdaily();
	}
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
		  //console.log(k);
		  
		  k = parseInt(k);
		
		//console.log(j);
		var myfile = k.toString()+".txt";
		//console.log(array[j]);
		//console.log(filedescriptor);
        //console.log(myfile);
        //console.log(array[k]);
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
			//console.log(text);
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
    getURLindi();
	}
//////////////////////////
/////This is for indi////
//////////////////////////
	function getURLindi()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.independent.co.uk/",
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
          if( myhref !== undefined){
		  if (myhref.substring(11,22) === "independent" && oldhref !== myhref)
		  {
			oldhref = myhref;
			//myhref = "http://www.indi.com"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
          }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticleindi(tarray);
			  }
			}
		});
	  });
    }
	  
	function getArticleindi(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
        //console.log(tmyfile);
		fd = fs.openSync("Articles/DAILY/DAILY_"+tmyfile, "w");
		fs.closeSync(fd);
		
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
        //console.log(myfile);
        //console.log(array[k]);
		fs.appendFile("Articles/INDI/INDI_"+myfile, array[k]+"\n", function (err) {});
	
		  //console.log(array[k]);
		  $("#main div div div div div div div div div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/INDI/INDI_"+myfile, text, function (err) {});
		  });
		  $("#main div h1").each(function(element) {
			//console.log("hello2");
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/INDI/INDI_"+myfile, text, function (err) {});
		  });
		  $("#main div div div .byline").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/INDI/INDI_"+myfile, text, function (err) {});
		  });
		  $("#main div div div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/INDI/INDI_"+myfile, text, function (err) {});
		  });
		});
		j++;
        //console.log(j);
	  }
    getURLwsj();
	}
//////////////////////////
/////This is for wsj////
//////////////////////////
	function getURLwsj()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://online.wsj.com/home-page",
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
          if( myhref !== undefined){
          
          //console.log(myhref.substring(14,29));
		  if (myhref.substring(14,29) === "wsj.com/article" && oldhref !== myhref)
		  {
			oldhref = myhref;
			//myhref = "http://www.wsj.com"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
          }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticlewsj(tarray);
			  }
			}
		});
	  });
    }
	  
	function getArticlewsj(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
        //console.log(tmyfile);
		fd = fs.openSync("Articles/WSJ/WSJ_"+tmyfile, "w");
		fs.closeSync(fd);
		
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
        //console.log(myfile);
        //console.log(array[k]);
		fs.appendFile("Articles/WSJ/WSJ_"+myfile, array[k]+"\n", function (err) {});
	
		  //console.log(array[k]);
		  /*$("div div div div div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/WSJ/WSJ_"+myfile, text, function (err) {});
		  });*/
		  $("div div div div div h1").each(function(element) {
			//console.log("hello2");
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/WSJ/WSJ_"+myfile, text, function (err) {});
		  });
		  $("#article_story_body div ul").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/WSJ/WSJ_"+myfile, text, function (err) {});
		  });
		  $("#article_story_body div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/WSJ/WSJ_"+myfile, text, function (err) {});
		  });
		});
		j++;
        //console.log(j);
	  }
    getURLchic();
	}
//////////////////////////
/////This is for chic////
//////////////////////////
	function getURLchic()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.chicagotribune.com/",
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
          if(myhref.substring(0,1) === "/" && myhref !== undefined){
		  if (oldhref !== myhref)
		  {
			oldhref = myhref;
			myhref = "http://www.chicagotribune.com"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
          }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticlechic(tarray);
			  }
			}
		});
	  });
    }
	  
	function getArticlechic(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
        //console.log(tmyfile);
		fd = fs.openSync("Articles/CHIC/CHIC_"+tmyfile, "w");
		fs.closeSync(fd);
		
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
        //console.log(myfile);
        //console.log(array[k]);
		fs.appendFile("Articles/CHIC/CHIC_"+myfile, array[k]+"\n", function (err) {});
	
		  //console.log(array[k]);
		  /*$("div div div div div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/CHIC/CHIC_"+myfile, text, function (err) {});
		  });*/
		  $(".story h1").each(function(element) {
			//console.log("hello2");
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/CHIC/CHIC_"+myfile, text, function (err) {});
		  });
		  $(".story #story-body span .byline").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/CHIC/CHIC_"+myfile, text, function (err) {});
		  });
		  $(".story #story-body #story-body-text p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/CHIC/CHIC_"+myfile, text, function (err) {});
		  });
		});
		j++;
        //console.log(j);
	  }
    getURLstartrib();
	}
//////////////////////////
/////This is for startrib/
//////////////////////////
	function getURLstartrib()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.startribune.com/",
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
          if(myhref !== undefined){
          //console.log(myhref.substring(11,22));
		  if (myhref.substring(11,22) === "startribune" &&  oldhref !== myhref)
		  {
			oldhref = myhref;
			//myhref = "http://www.startribagotribune.com"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
          }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticlestartrib(tarray);
			  }
			}
		});
	  });
    }
	  
	function getArticlestartrib(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
        //console.log(tmyfile);
		fd = fs.openSync("Articles/STARTRIB/STARTRIB_"+tmyfile, "w");
		fs.closeSync(fd);
		
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
        //console.log(myfile);
        //console.log(array[k]);
		fs.appendFile("Articles/STARTRIB/STARTRIB_"+myfile, array[k]+"\n", function (err) {});
	
		  //console.log(array[k]);
		  /*$("div div div div div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/STARTRIB/STARTRIB_"+myfile, text, function (err) {});
		  });*/
		  $("#mainContentWraper div div div .articleHeader h2").each(function(element) {
			//console.log("hello2");
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/STARTRIB/STARTRIB_"+myfile, text, function (err) {});
		  });
		  $("#mainContentWraper div div div .HeadingDetails ul").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/STARTRIB/STARTRIB_"+myfile, text, function (err) {});
		  });
		  $("#mainContentWraper div div div div div .articleStory div p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/STARTRIB/STARTRIB_"+myfile, text, function (err) {});
		  });
		});
		j++;
        //console.log(j);
	  }
    getURLgazette();
	}
//////////////////////////
/////This is for gazette////
//////////////////////////
	function getURLgazette()
	{
	  var array = [];
	  var myhref = "new";
	  var oldhref = "old";
	  var i = 0;
	  
	  todo++;
	  request({
		uri: "http://www.post-gazette.com/",
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
          if( myhref !== undefined){
		  if (myhref.substring(11,23) === "post-gazette" && oldhref !== myhref)
		  {
			oldhref = myhref;
			//myhref = "http://www.gazette.com"+myhref;
			tarray.push(myhref);
			//console.log(myfile);
			//console.log(myhref);
			i++;
		  }
          }
			//console.log(ttodo);
			if(ttodo == 0){
			  //console.log("im here");
			  todo--;
			  if(todo == 0){
				getArticlegazette(tarray);
			  }
			}
		});
	  });
    }
	  
	function getArticlegazette(array){
	  var j = 0;
	  var filedescriptor = [];
	  //console.log(array);
	  while (j<array.length-1)
	  {
		var tmyfile = j.toString()+".txt";
        //console.log(tmyfile);
		fd = fs.openSync("Articles/GAZETTE/GAZETTE_"+tmyfile, "w");
		fs.closeSync(fd);
		
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
        //console.log(myfile);
        //console.log(array[k]);
		fs.appendFile("Articles/GAZETTE/GAZETTE_"+myfile, array[k]+"\n", function (err) {});
	
		  //console.log(array[k]);
		  /*$("#main div div div div div div div div div img").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.attr("src")+"\n";
			//console.log(text);
			fs.appendFile("Articles/GAZETTE/GAZETTE_"+myfile, text, function (err) {});
		  });*/
		  $("#story .story-headline h1").each(function(element) {
			//console.log("hello2");
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			//console.log(text);
			fs.appendFile("Articles/GAZETTE/GAZETTE_"+myfile, text, function (err) {});
		  });
		  $("#story .story_lastupdate").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = paragraph.text()+"\n";
			fs.appendFile("Articles/GAZETTE/GAZETTE_"+myfile, text, function (err) {});
		  });
		  $("#story .thisStory p").each(function(element) {
			//console.log(myfile);
			var paragraph = $(this);
			var text = "\n"+paragraph.text()+"\n";
			fs.appendFile("Articles/GAZETTE/GAZETTE_"+myfile, text, function (err) {});
		  });
		});
		j++;
        //console.log(j);
	  }
	}