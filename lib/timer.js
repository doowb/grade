
/**
 * Execute a benchmark for the specified number of seconds.
 * Seconds is an accumulation of the actual run time of the
 * function under test. This ensures the timing and setup/teardown
 * steps don't interfer with the actual benchmark.
 *
 * @param  {number}   `max`      Number of seconds to run the tests for.
 * @param  {Function} `fn`       Function under test
 * @param  {Function} `beforeFn` Function to run before running the test
 * @param  {Function} `afterFn`  Function to run after running the test
 * @return {Object}   Results of the benchmark
 */

var execute = function (max, fn, beforeFn, afterFn) {

  beforeFn = beforeFn || function () {};
  afterFn = afterFn || function () {};

  var results = {
    counter: 0,
    seconds: 0,
    milliseconds: 0
  };

  var start, end;
  while(results.seconds < max) {
    // run any pre-function options
    beforeFn();

    // measure actual function time
    start = process.hrtime();
    fn();
    end = process.hrtime(start);

    // run any post-function options
    afterFn();

    // update the actual run count;
    results.counter++;

    // calculate elasped time
    results.seconds += end[0];
    results.milliseconds += end[1];

    if (results.milliseconds > 1000000000) {
      results.seconds += 1;
      results.milliseconds = results.milliseconds - 1000000000;
    }
  }

  return results;
};

module.exports = {
  execute: execute
};
