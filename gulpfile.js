var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    customProperties = require("postcss-custom-properties");

// Configure paths
var paths = {

  // Inputs
  js: ['./gui/js/**/*.js'],
  css: ['./gui/css/**/*.css'],
  images: ['./gui/i/**/*.*'],

  // Outputs
  jsOutput: 'all.js',
  cssOutput: 'all.css',

  // Destinations
  jsDest: './dist/js/',
  cssDest: './dist/css/',
  imgDest: './dist/i/'

};

// Process stylesheets
gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(postcss([customProperties()]))
    .pipe(concat(paths.cssOutput))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.cssDest));
});

// Concatenate and minify JavaScript
gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.jsOutput))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest))
});

// Watch for changes in JS and CSS
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

// Copy image assets into /dist
gulp.task('copy', function(){
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.imgDest));
});

gulp.task('default', ['watch', 'css', 'js', 'copy']);
