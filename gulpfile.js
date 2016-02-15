var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');

gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});

// Compiles LESS > CSS
gulp.task('build-less', function(){
    return gulp.src('assets/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./public/assets/stylesheets'));
});