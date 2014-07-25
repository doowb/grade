/*!
 * grade <https://github.com/doowb/grade>
 *
 * Copyright (c) 2014 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var glob = require('globby');
var arrayify = require('arrayify');
var _ = require('lodash');

/**
 * Grade the benchmarks and return the results
 * 
 * @param  {Object} `options` Options containing `files`
 * @return {Array} List of results
 */
function grade (options) {
  options = options || {};
  var patterns = arrayify(options.files || path.join(process.cwd(), 'benchmark', '*.js'));
  return _.flatten(glob.sync(patterns, options).map(function (filepath) {
    var benchmark = require(filepath);
    return benchmark.run();
  }));
};

grade.Benchmark = require('./lib/benchmark');
module.exports = grade;