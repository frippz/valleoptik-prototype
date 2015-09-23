var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    watch = require('gulp-watch'),
    customProperties = require('postcss-custom-properties'),
    ghPages = require('gh-pages'),
    path = require('path');

// Configure paths
var paths = {

  // Inputs
  js: ['./src/gui/js/**/*.js'],
  css: ['./src/gui/css/**/*.css'],

  // Static assets
  images: ['./src/gui/i/**/*.*'],
  templates: ['./src/**/*.html'],

  // Outputs
  jsOutput: 'main.js',
  cssOutput: 'styles.css',

  // Destinations
  jsDest: './dist/gui/js/',
  cssDest: './dist/gui/css/',
  imgDest: './dist/gui/i/',
  tplDest: './dist/'

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

// Watch for changes
gulp.task('watch', function() {
  watch(paths.css, function() {
    gulp.start(['css']);
  });
  watch(paths.js, function() {
    gulp.start(['js']);
  });
  watch(paths.images, function() {
    gulp.start(['images']);
  });
  watch(paths.templates, function() {
    gulp.start(['templates']);
  });
});

// Copy image assets into /dist
gulp.task('images', function(){
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.imgDest));
});

// Copy template assets into /dist
gulp.task('templates', function () {
  gulp.src(paths.templates)
    .pipe(gulp.dest(paths.tplDest));
});

// Deploy to gh-pages
gulp.task('deploy', function (cb) {
  ghPages.publish(path.join(process.cwd(), paths.tplDest), cb);
});

gulp.task('default', ['watch', 'css', 'js', 'images', 'templates']);
