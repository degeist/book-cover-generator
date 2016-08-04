var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Variables
var input = './_scss/main.scss',
    output = './bcg/static/css/',
    sassOptions = {
      errLogToConsole: true,
      outputStyle: 'expanded'
    },
    jsInput = [
      'node_modules/blueimp-load-image/js/load-image.all.min.js',
      'node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
      'node_modules/blueimp-file-upload/js/jquery.fileupload-process.js',
      'node_modules/blueimp-file-upload/js/jquery.fileupload-image.js',
      'node_modules/blueimp-file-upload/js/jquery.fileupload-validate.js',
      '_js/fileupload.js',
      '_js/jquery.inline-edit.js',
      '_js/artboard.js',
      '_js/ui.js'
    ],
    jsOutput = './bcg/static/js/';

// Compress all the JS into a single minified file

gulp.task('minifyJS', function() {
    return gulp.src(jsInput)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsOutput));
});

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
