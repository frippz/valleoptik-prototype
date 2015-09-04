var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat');

var paths = {
  scripts: ['./gui/js/**/*.js'],
  css: ['./gui/css/**/*.css'],
  images: ['./gui/i/**/*.*']
};

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(concat('all.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function () {

});

gulp.task('watch', function() {
  gulp.watch(paths.css, ['default']);
});

gulp.task('copy', function(){
  gulp.src(paths.images)
    .pipe(gulp.dest('dist/i/'));
});

gulp.task('default', ['watch', 'css', 'copy']);
