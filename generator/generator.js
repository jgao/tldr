var fs = require("fs");
var HashMap = require("hashmap").HashMap;


var commonWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
				   "is", "are", "", "was", "--", "were"];


var concisenessMultiple = 0.025;
var concisenessSingle = 0.05;

var generateMultiple = function(){
  var article1 = fs.readFileSync("data/article", "utf8");
  var article2 = fs.readFileSync("data/article2", "utf8");

  var sentences1 = article1.split(".");
  var sentences2 = article2.split(".");

  var freq = new HashMap();

  for(var i=0;i<sentences1.length;i++){
  	var words = sentences1[i].split(" "); // split just by " " for now
  	for(var j=0;j<words.length;j++){
  		var count = freq.get(words[j].toLowerCase());
  		count = count ? count+1 : 1;
  		freq.set(words[j].toLowerCase(), count);
  	}
  }
  for(var i=0;i<sentences2.length;i++){
  	var words = sentences2[i].split(" "); // split just by " " for now
  	for(var j=0;j<words.length;j++){
  		var count = freq.get(words[j].toLowerCase());
  		count = count ? count+1 : 1;
  		freq.set(words[j].toLowerCase(), count);
  	}
  }

  for(var i=0;i<commonWords.length;i++){
  	freq.set(commonWords[i].toLowerCase(), 2);
  }

  var sentenceScores1 = [];
  var sentenceScores2 = [];

  for(var i=0;i<sentences1.length;i++){
  	var words = sentences1[i].split(" "); // split just by " " for now
  	sentenceScores1[i] = 0;
    if(sentences1[i].indexOf("\"") < 0){
      if(sentences1[i].indexOf("\n") >= 0) sentences1[i] = sentences1[i].split("\n").pop(); // removes titles
      for(var j=0;j<words.length;j++){
  		sentenceScores1[i] += freq.get(words[j].toLowerCase());
  	  }
  	  sentenceScores1[i] = sentenceScores1[i]/words.length;
    }
  }
  for(var i=0;i<sentences2.length;i++){
  	var words = sentences2[i].split(" "); // split just by " " for now
  	sentenceScores2[i] = 0;
    if(sentences2[i].indexOf("\"") < 0){
      if(sentences2[i].indexOf("\n") >= 0) sentences2[i] = sentences2[i].split("\n").pop(); // removes titles
      for(var j=0;j<words.length;j++){
  		sentenceScores2[i] += freq.get(words[j].toLowerCase());
  	  }
  	  sentenceScores2[i] = sentenceScores2[i]/words.length;
    }
  }

  var sortedScores = sentenceScores1.slice().concat(sentenceScores2.slice()).sort(function(a, b){
  		return b-a;
  });

  var threashold = sortedScores[Math.floor((sentenceScores1.length+sentenceScores2.length)*concisenessMultiple)-1];

  var count1 = 0;
  var count2 = 0;

  var summary = "";
  for(var i=0;i<Math.max(sentences1.length, sentences2.length);i++){
  	if(i < sentences1.length){
      if(sentenceScores1[i] >= threashold){
    	summary += sentences1[i] + ". ";
    	count1++;
  	  }
  	}
    if(i < sentences2.length){
      if(sentenceScores2[i] >= threashold){
    	summary += sentences2[i] + ". ";
    	count2++;
  	  }
  	}
  }

  return [ summary, count1, count2, concisenessMultiple, sentences1.length, sentences2.length ];
}

var generate = function(){
  var article = fs.readFileSync("data/article", "utf8");

  var sentences = article.split("."); // split just by "." for now

  var freq = new HashMap();

  for(var i=0;i<sentences.length;i++){
  	var words = sentences[i].split(" "); // split just by " " for now
  	for(var j=0;j<words.length;j++){
  		var count = freq.get(words[j].toLowerCase());
  		count = count ? count+1 : 1;
  		freq.set(words[j].toLowerCase(), count);
  	}
  }

  for(var i=0;i<commonWords.length;i++){
  	freq.set(commonWords[i].toLowerCase(), 2);
  }

  var sentenceScores = [];
  for(var i=0;i<sentences.length;i++){
  	var words = sentences[i].split(" "); // split just by " " for now
  	sentenceScores[i] = 0;
    if(sentences[i].indexOf("\"") < 0){
      if(sentences[i].indexOf("\n") >= 0) sentences[i] = sentences[i].split("\n").pop(); // removes titles
      for(var j=0;j<words.length;j++){
  		sentenceScores[i] += freq.get(words[j].toLowerCase());
  	  }
  	  sentenceScores[i] = sentenceScores[i]/words.length;
    }
  }

  var sortedScores = sentenceScores.slice().sort(function(a, b){
  		return b-a;
  });

  var threashold = sortedScores[Math.floor(sentenceScores.length*concisenessSingle)-1];

  var count = 0;

  var summary = "";
  for(var i=0;i<sentences.length;i++){
  	if(sentenceScores[i] >= threashold){
  		summary += sentences[i] + ". ";
  		count++;
  	}
  }

  return [ summary, count, concisenessSingle, sentences.length ];
}

var summarizeDemoDay = function(story, sources, concisenessIndex){
  var articles = [];
  var sentences = [];
  for(var i=0;i<sources.length;i++){
    var file = "data/" + story + sources[i];
    articles[i] = fs.readFileSync(file, "utf8");
    sentences[i] = articles[i].split(".");
  }

  var freq = new HashMap();

  for(var k=0;k<sentences.length;k++){
    for(var i=0;i<sentences[k].length;i++){
      var words = sentences[k][i].split(" "); // split just by " " for now
      for(var j=0;j<words.length;j++){
        var count = freq.get(words[j].toLowerCase());
        count = count ? count+1 : 1;
        freq.set(words[j].toLowerCase(), count);
      }
    }
  }

  for(var i=0;i<commonWords.length;i++){
    freq.set(commonWords[i].toLowerCase(), 1);
  }

  var sentenceScoresList = [];

  for(var k=0;k<sentences.length;k++){
    sentenceScoresList[k] = [];
    for(var i=0;i<sentences[k].length;i++){
      var words = sentences[k][i].split(" "); // split just by " " for now
      sentenceScoresList[k][i] = 0;
      if(sentences[k][i].indexOf("\"") < 0){
        if(sentences[k][i].indexOf("\n") >= 0) sentences[k][i] = sentences[k][i].split("\n").pop(); // removes titles
        for(var j=0;j<words.length;j++){
          sentenceScoresList[k][i] += freq.get(words[j].toLowerCase());
        }
        sentenceScoresList[k][i] = sentenceScoresList[k][i]/words.length;
      }
    }
  }

  var sortedScores = [];
  var totalSentences = 0;
  var maxSentences = -1;
  for(var i=0;i<sentenceScoresList.length;i++){
    totalSentences += sentences[i].length;
    maxSentences = Math.max(maxSentences, sentences[i].length);
    sortedScores = sortedScores.concat(sentenceScoresList[i].slice());
  }

  sortedScores = sortedScores.sort(function(a, b){
      return b-a;
  });

  var threashold = sortedScores[Math.floor(totalSentences * concisenessIndex) - 1];

  var summary = "";
  for(var i=0;i<maxSentences;i++){
    for(var j=0;j<sentences.length;j++){
      if(i < sentences[j].length){
        if(sentenceScoresList[j][i] >= threashold){
          summary += sentences[j][i] + ". ";
        }
      }
    }
  }

  return summary;
}




exports.generate = generate;
exports.generateMultiple = generateMultiple;

// for demo day only
exports.summarizeDemoDay = summarizeDemoDay;