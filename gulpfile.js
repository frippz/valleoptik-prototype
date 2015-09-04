var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// Configure paths
var paths = {
  js: ['./gui/js/**/*.js'],
  css: ['./gui/css/**/*.css'],
  images: ['./gui/i/**/*.*']
};

// Process stylesheets
gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(concat('all.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

// Concatenate and minify JavaScript
gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
});

// Watch for changes in JS and CSS
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

// Copy image assets into /dist
gulp.task('copy', function(){
  gulp.src(paths.images)
    .pipe(gulp.dest('dist/i/'));
});

gulp.task('default', ['watch', 'css', 'js', 'copy']);
