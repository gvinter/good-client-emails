'use strict';

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-sass'),
    concat  = require('gulp-concat');

var getLiveReload = function() {
  var livereload = require('gulp-livereload');
  
  // Have function overwrite itself with a new one that return s the loaded module
  getLiveReload = function() {
    return livereload;
  }

  return livereload;
};

// Sass
gulp.task('sass', function() {
  return gulp.src('assets/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('sass-reload', function() {
  var livereload = getLiveReload();
  
  return gulp.src('assets/sass/main.sass')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('public'))
    .pipe(livereload());
});

gulp.task('vendor-js', function() {
  return gulp.src('assets/js/vendor/**/*.js')
    .pipe(concat('vendors.js'))
    //only uglify if gulp is ran with '--type production'
    // .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(gulp.dest('public'));
});

gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(concat('main.js'))
    //only uglify if gulp is ran with '--type production'
    // .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(gulp.dest('public'));
});

// 
// Copy
// 
gulp.task('copy', function() {
   gulp.src('./assets/img/**/*.{jpg,png,svg}')
   .pipe(gulp.dest('./public/img'));
});

// Watch
gulp.task('watch', function() {
  getLiveReload().listen();
  
  // Watch Sass
  gulp.watch('assets/sass/**/*.{sass,scss}', ['sass-reload']);
  // Watch Main Js
  gulp.watch('assets/js/*.js', ['js']);
});