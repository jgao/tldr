var generator = require("../generator/generator");

var summarize = function(req, res){
	console.log(req.query);

	var story = req.query.story;
	var sources = req.query.sources;

	res.contentType("json");
	res.send({
		title: "Royal Baby is Born - It's a Boy!",
		summary: "HERE IS SOME SUMMARY TO BE GENERATED"
	});
}

exports.summarize = summarize;