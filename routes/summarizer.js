var generator = require("../generator/generator");

var summarize = function(req, res){
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

var getTitle = function(story){
	if(story == "chineseearthquake") return "Earthquake Devastates Chinese Town";
	if(story == "royalbaby") return "Royal Baby is Born - It's a Boy!";
	if(story == "trainexplosion") return "Train Derails and Explodes in Quebec, Death Toll Rising";
	if(story == "weiner") return "New York City Mayor Candidate Anthony Weiner Caught in Another Scandal";

	return "Please stop messing with the javascript. STAHP.";
}

exports.summarize = summarize;