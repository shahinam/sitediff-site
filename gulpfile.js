/*jslint node: true */
/*global
    gulp, window, document
*/

(function () {
  'use strict';

  var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    prettify = require('gulp-html-prettify'),
    connect = require('gulp-connect'),
    config = {
      css: {
        watch: './src/sass/**/*.scss',
        input: './src/sass/styles.scss',
        output: './web/css/'
      },
      js: {
        input: './src/js/**/*.js',
        output: './web/js/'
      },
      html: {
        watch: './src/pug/**/*.pug',
        input: './src/pug/*.pug',
        output: './web/'
      },
      images: {
        input: './src/images/**/*',
        output: './web/images/',
      },
      vendors: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
      ]
    };

  sass.compiler = require('node-sass');

  gulp.task('html', function() {
    return gulp.src(config.html.input)
      .pipe(pug({}))
      .pipe(prettify({indent_char: ' ', indent_size: 2}))
      .pipe(gulp.dest(config.html.output))
      .pipe(connect.reload());
  });

  gulp.task('css', function() {
    return gulp.src(config.css.input)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.css.output))
      .pipe(connect.reload());
  });

  gulp.task('vendor', function() {
    return gulp.src(config.vendors)
      .pipe(gulp.dest('./web/js/vendor/'));
  });

  gulp.task('assets', function() {
    return gulp.src(config.images.input)
      .pipe(gulp.dest(config.images.output));
  });

  gulp.task('connect', function() {
    connect.server({
      root: 'web',
      livereload: true
    });
  });

  gulp.task('watch', function () {
    gulp.watch(
      [config.css.watch, config.html.watch],
      gulp.series(['css', 'html'])
    );
  });

  gulp.task('build', gulp.series(['html', 'css', 'vendor', 'assets']));

  gulp.task('default', gulp.series(['build', gulp.parallel(['connect', 'watch'])]));

}());
