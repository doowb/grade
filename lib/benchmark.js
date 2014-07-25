var _ = require('lodash');
var timer = require('./timer');

/**
 * Create a new instance of Benchmark.
 * Use this to add benchmarks in a file.
 * 
 * @param {Object} `options` Additional options to pass to `timer.execute`
 */

var Benchmark = function (options) {
  this.options = _.extend({max: 1}, options);
  this.tests = [];
};


/**
 * Add a new benchmark to the run.
 * 
 * @param {String}   `title`  Describe the benchmark.
 * @param {Function} `fn`     The actual function to run.
 * @param {Function} `before` A function to call before the benchmark is run.
 * @param {Function} `after`  A function to call after the benchmark is run.
 */

Benchmark.prototype.add = function(title, fn, before, after) {
  var test = {
    title: title,
    fn: fn,
    before: before || function () {},
    after: after || function () {}
  };
  this.tests.push(test);
};

/**
 * Run the registered benchmarks and return timings.
 * 
 * @return {Array} List of timings.
 */

Benchmark.prototype.run = function() {
  return this.tests.map(function (test) {
    console.log('running', test.title);
    return {
      title: test.title,
      timings: timer.execute(this.options.max, test.fn, test.before, test.after)
    };
  }.bind(this));
};

module.exports = Benchmark;