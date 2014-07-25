
var grade = require('..');
var fs = require('fs');
var _ = require('lodash');

var Benchmark = grade.Benchmark;
var benchmark = new Benchmark({max: 10});

var calcCount = function (path) {
  var file = fs.readFileSync(path).toString('utf8');
  var lines = _.map(file.split(/\n\r|\r\n|\n|\r/), function (line) {
    return line.split(/\w|\W/).length;
  });
  return _.reduce(lines, function (acc, line) {
    return acc + line;
  }, 0);
};

var wordCount = function (path) {
  var count = 0;
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      var dirs = fs.readdirSync(path);
      dirs.forEach(function (dir) {
        count += wordCount(dir);
      });
    } else {
      count += calcCount(path);
    }
  }
  return count;
};

benchmark.add('read-files', function () {
  var count = wordCount(process.cwd());
});


module.exports = benchmark;