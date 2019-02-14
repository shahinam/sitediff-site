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
    minify = require('gulp-minify'),
    connect = require('gulp-connect'),
    config = {
      css: {
        watch: './src/sass/**/*.scss',
        input: './src/sass/styles.scss',
        output: './web/css/'
      },
      js: {
        watch: './src/js/**/*.js',
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
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/swiper/dist/js/swiper.min.js'
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

  gulp.task('js', function() {
    return gulp.src(config.js.input)
      .pipe(minify({
        ext: {
          src: '.js',
          min: '.min.js'
        }
      }))
      .pipe(gulp.dest(config.js.output))
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
    gulp.watch(config.css.watch, gulp.series(['css']));
    gulp.watch(config.html.watch, gulp.series(['html']));
    gulp.watch(config.js.watch, gulp.series(['js']));
  });

  gulp.task('build', gulp.series(['vendor', 'assets', 'css', 'js', 'html']));

  gulp.task('default', gulp.series(['build', gulp.parallel(['connect', 'watch'])]));

}());
