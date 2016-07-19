var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Variables
var input = './_scss/main.scss';
var output = './bcg/static/css/';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Run the Gulp task
gulp.task('styles', function() {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest(output))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./_scss/**/*.scss',['styles']);
});
