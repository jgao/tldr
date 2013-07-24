
var withEmail = function(req, res){
	var email = req.query.email;
	var key = "tldrkeylololol12123--"; // security by obscurity
	
	var link = "http://www.jackgao.org/tldrmail/signup.php?email=" + email + "&key=" + key;

	var request = require('request');
	request(link, function (error, response, body) {
	});

	res.send({done: true});
}


exports.withEmail = withEmail;