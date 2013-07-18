var generator = require("../generator/generator");

/*
 * GET home page.
 */

exports.index = function(req, res){
  var single = generator.generate();
  var multiple = generator.generateMultiple();
  res.render('index', { single: single[0],
  						singleCount: single[1],
  						singleConcise: single[2],
  						singleTotal: single[3],
  						multiple: multiple[0],
  						multipleCount1: multiple[1],
  						multipleCount2: multiple[2],
  						multipleConcise: multiple[3],
  						multipleTotal1: multiple[4],
  						multipleTotal2: multiple[5] });
};