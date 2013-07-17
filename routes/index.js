var generator = require("../generator/generator");

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' , data: generator.generate() });
};