var generator = require("../generator/generator");

var summarize = function(req, res){
	console.log(req.query);

	var story = req.query.story;
	var sources = req.query.sources;
	var conciseIndex = req.query.conciseIndex;

	var title = getTitle(story);
	var summary = generator.summarizeDemoDay(story, sources, conciseIndex); // demo day version
	
	res.contentType("json");
	res.send({
		title: title,
		summary: summary
	});
}

var getTitle(story){
	if(story == "chineseearthquakebbc") return "Earthquake Devastates Chinese Town";
	if(story == "royalbaby") return "Royal Baby is Born - It's a Boy!";
	if(story == "trainexplosion") return "Train Derails and Explodes in Quebec, Death Toll Rising";
	if(story == "weiner") return "New York City Mayor Candidate Weiner Caught in Another Scandal";

	return "Please stop messing with the javascript. STAHP.";
}

exports.summarize = summarize;