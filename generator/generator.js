var fs = require("fs");
var HashMap = require("hashmap").HashMap;


var commonWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
				   "is", "are", "", "was", "--", "were"];


var generate = function(){
  var article = fs.readFileSync('data/article', 'utf8');

  sentences = article.split("."); // split just by "." for now

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
      for(var j=0;j<words.length;j++){
  		sentenceScores[i] += freq.get(words[j].toLowerCase());
  	  }
  	  sentenceScores[i] = sentenceScores[i]/words.length;
    }
  }

  var sortedScores = sentenceScores.slice().sort(function(a, b){
  		return b-a;
  	});
  console.log(sortedScores);

  var conciseness = 0.1;
  var threashold = sortedScores[Math.floor(sentenceScores.length*conciseness)-1];

  for(var i=0;i<sentences.length;i++){
  	if(sentenceScores[i] >= threashold){
  		console.log(sentences[i]);
  	}
  }



  freq.forEach(function(value, key){
  	if(value >= 5) console.log(key + " : " + value);
  });

  return 0;
}

exports.generate = generate;