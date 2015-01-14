'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

var semver = require('semver');

gulp.task('tsd:npm-install', function(done) {
  gutil.log('Checking tsd version.');

  exec('tsd --version', function (err, stdout, stderr) {
    var version;
    var satisfiesVersion;
    if (!err) {
      var m = stdout.match('tsd ((.*)?-.*)');
      version = m[1];
      satisfiesVersion = m[2];
    }
    if (err || !semver.satisfies(satisfiesVersion, '>=0.6.0')) {
      gutil.log('Installing tsd@next globally');
      return exec('npm install -g tsd@next', function (err, stdout, stderr) {
        gutil.log('> npm install -g tsd@next');
        gutil.log(stdout);
        gutil.log(stderr);
        if (!err) {
          gutil.log('tsd ' + version + ' is installed.');
        }
        done(err);
      });
    } else {
      gutil.log('tsd ' + version + ' is installed.');
      done();
    }
  });
});

gulp.task('tsd:init', ['tsd:npm-install'], function(done) {
  if (!fs.existsSync('./tsd.json')) {
    exec('tsd init', function (err, stdout, stderr) {
      gutil.log(stdout);
      gutil.log(stderr);
      if (!err) {
        gutil.log('tsd has been initialized.');
      }
      done(err);
    });
  } else {
    gutil.log('tsd.json exists');
    done();
  }
});

gulp.task('tsd:install', ['tsd:init'], function(done) {
  var bower = require(path.join(process.cwd(), 'bower.json'));

  var dependencies = [].concat(
    Object.keys(bower.dependencies),
    Object.keys(bower.devDependencies)
  );

  exec('tsd install ' + dependencies.join(' ') + ' -ros', function (err, stdout, stderr) {
    gutil.log(stdout);
    gutil.log(stderr);
    if (!err) {
      gutil.log('Required d.ts files have been installed in typings/ directory');
    }
    done(err);
  });
});

gulp.task('tsd:reinstall', ['tsd:init'], function(done) {
  exec('tsd reinstall -ro', function (err, stdout, stderr) {
    gutil.log(stdout);
    gutil.log(stderr);
    done(err);
  });
});

gulp.task('tsd:purge', function(done) {
  exec('tsd purge', function (err, stdout, stderr) {
    gutil.log(stdout);
    gutil.log(stderr);
    if (!err) {
      gutil.log('typings directory has been purged');
    }
    done(err);
  });
});

gulp.task('tsd', ['tsd:install']);