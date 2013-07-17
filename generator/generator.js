var fs = require("fs");

var generate = function(){
  var data = fs.readFileSync('data/article', 'utf8');

  data = data.split(". "); // split just by . for now

  var ret = data.length;

  return ret;
}

exports.generate = generate;