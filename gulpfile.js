var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');

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

// Load the node frontend JS
gulp.task('compress', function() {
  gulp.src([
    'node_modules/blueimp-load-image/js/load-image.all.min.js',
    'node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
    'node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
    'node_modules/blueimp-file-upload/js/jquery.iframe-transport.js',
    'node_modules/blueimp-file-upload/js/jquery.fileupload.js',
    'node_modules/blueimp-file-upload/js/jquery.fileupload-process.js',
    'node_modules/blueimp-file-upload/js/jquery.fileupload-image.js',
    'node_modules/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js'
  ])
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest('./bcg/static/js/vendor/fileuploader/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./_scss/**/*.scss',['styles']);
});
