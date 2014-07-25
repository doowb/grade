
var grade = require('..');

var Benchmark = grade.Benchmark;
var benchmark = new Benchmark();



var beforeI = 0;
function before () {
  beforeI++;
}

var afterI = 0;
function after () {
  afterI++;
}

var total = 0;
var test = function () {
  var i = 0;
  while ((i++) < 50000) {}
  total += (beforeI + afterI);
};

benchmark.add('main', test, before, after);


module.exports = benchmark;