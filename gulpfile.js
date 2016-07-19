var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('./_scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./bcg/static/css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./_scss/**/*.scss',['styles']);
});
