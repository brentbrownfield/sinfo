#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .option('-d, --dir [dir]', 'Specify the svn directory')
  .option('-p, --path [path]', 'Specify the svn path to switch to')
  .parse(process.argv);

var dir = program.dir || ".";
var path = program.path || "trunk";

var p = require('path');
var cwd = p.resolve(".");
var svn = require('svn-info');

svn(dir, function(err, info) {
  if(err) {
    console.log("Not a SVN Directory");
    throw err;
  }
  var url = info.url;
  var repoRoot = info.repositoryRoot;

  var idx = url.indexOf("/SWR");
  var newPath = "^/" + path + (idx >= 0 ? url.substring(idx): "/");
  console.log(newPath);
});