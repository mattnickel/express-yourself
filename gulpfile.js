'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

gulp.task('sass', function () {
  gulp.src('./app/scss/index.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/css/index.css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/scss/index.sass', ['sass']);
});

gulp.task('webpackdev', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/'));
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['copy', 'sass', 'webpackdev']);
gulp.task('default', ['build']);
