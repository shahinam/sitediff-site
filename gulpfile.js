/*jslint node: true */
/*global log */

(function () {
  'use strict';

  var gulp = require('gulp'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    flexbugs = require('postcss-flexbugs-fixes'),
    uncss = require('postcss-uncss'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    htmlmin = require('gulp-htmlmin'),
    prettify = require('gulp-html-prettify'),
    minify = require('gulp-minify'),
    svgmin = require('gulp-svgmin'),
    imagemin = require('gulp-imagemin'),
    favicons = require('favicons').stream,
    connect = require('gulp-connect'),
    ngrok = require('ngrok'),
    config,
    favicon_config;

  // Configurations
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
      output: './web/images/'
    },
    vendors: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/swiper/dist/js/swiper.min.js'
    ]
  };
  favicon_config = {
    appName: 'SiteDiff - Speed up your QA process with automated testing',
    appShortName: 'SiteDiff',
    appDescription: 'Sitediff is the ideal tool to verify security updates and other upgrades. With its advanced site crawler and an easy to use web interface, compare before and after versions of your website in no time for unwanted discrepancies.',
    developerName: 'EvolvingWeb',
    developerURL: 'http://evolvingweb.ca/',
    background: '#383FDA',
    path: '/images/favicons/',
    url: 'http://sitediff.com/',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/?homescreen=1',
    version: 1.0,
    logging: false,
    html: 'index.html',
    pipeHTML: true,
    replace: true
  };

  sass.compiler = require('node-sass');

  /**
   * HTML.
   *
   * - Compile PUG into HTML.
   * - Prettify HTML output.
   */
  gulp.task('html', function () {
    return gulp.src(config.html.input)
      .pipe(pug({}))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(config.html.output))
      .pipe(prettify({indent_char: ' ', indent_size: 2}))
      .pipe(rename({suffix: '-pretty'}))
      .pipe(gulp.dest(config.html.output + '/pretty/'))
      .pipe(connect.reload());
  });

  /**
   * CSS.
   *
   * - Compile SASS into CSS.
   * - Create sourcemaps.
   */
  gulp.task('css', function () {
    var plugins = [
        autoprefixer(['cover 99.5%']),
        flexbugs(),
        uncss({
          html: [config.html.output + '/*.html'],
          htmlroot: './web/',
          ignpre: ['swiper-']
        })
      ];
    return gulp.src(config.css.input)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.css.output))
      .pipe(connect.reload());
  });

  /**
   * Javascript.
   *
   * - Minify all scripts.
   */
  gulp.task('js-custom', function () {
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
  gulp.task('js-vendor', function () {
    return gulp.src(config.vendors)
      .pipe(gulp.dest(config.js.output + '/vendor/'));
  });
  gulp.task('js', gulp.parallel(['js-custom', 'js-vendor']));

  /**
   * Assets.
   *
   * - Minify image and SVG assets.
   * - Create favicons.
   */
  gulp.task('assets-svg', function () {
    return gulp.src(config.images.input + '.svg')
      .pipe(svgmin())
      .pipe(gulp.dest(config.images.output));
  });
  gulp.task('assets-png', function () {
    return gulp.src(config.images.input + '@(.png|.jpg|.jpeg)')
      .pipe(imagemin())
      .pipe(gulp.dest(config.images.output));
  });
  gulp.task('assets-favicon', function () {
    return gulp.src(config.images.input + '.fav')
      .pipe(favicons(favicon_config))
      .pipe(gulp.dest(config.images.output + '/favicons/'));
  });
  gulp.task('assets', gulp.parallel(['assets-svg', 'assets-png', 'assets-favicon']));

  /**
   * Build, serve and watch.
   */
  gulp.task('connect', function () {
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

  gulp.task('online', async function () {
    const url = await ngrok.connect(8080);
    console.log('Serving website at ' + url);
    return url;
  });

  gulp.task('build', gulp.series(['assets', 'html', 'js', 'css']));

  gulp.task('default', gulp.series(['build', gulp.parallel(['connect', 'watch'])]));

}());
