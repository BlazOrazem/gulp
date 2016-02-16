var gulp = require('gulp'); // Gulp dependency for this project
var gUtil = require('gulp-util'); // Gulp utilities
var cssNano = require('gulp-cssnano'); // Minify CSS files
var stripCssComments = require('gulp-strip-css-comments'); //Strip comments from CSS
var less = require('gulp-less'); // Less compiler
var concat = require('gulp-concat'); // Concatenate files
var merge = require('merge-stream'); // Merge different streams
var uglify = require('gulp-uglify'); // Minify Javascript files
var order = require("gulp-order"); // Reorder a stream of files

// Stylesheets (CSS & LESS)
gulp.task('styles', function() {
    var lessStream = gulp.src(['assets/less/*.less'])
        .pipe(less())
        .pipe(order([
            "main.less",
            "*.less"
        ]))
        .pipe(concat('less-files.less'));

    var cssStream = gulp.src(['assets/css/*.css'])
        .pipe(concat('css-files.css'));

    var mergedStream = merge(cssStream, lessStream)
        .pipe(concat('styles.css'))
        .pipe(stripCssComments())
        .pipe(cssNano())
        .pipe(gulp.dest('./public/assets/stylesheets'));

    return mergedStream;
});

// Javascript
gulp.task('scripts', function() {
    return gulp.src(['assets/javascript/*.js'])
        .pipe(order([
            "jquery-1.12.0.min.js",
            "*.js"
        ]))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets/javascript/'));
});

// Watcher
gulp.task('watch', function(){
    gulp.watch('assets/less/*.less', ['styles']);
    gulp.watch('assets/javascript/*.js', ['scripts']);
});

// Gulp Initialize
gulp.task('default', ['styles', 'scripts', 'watch'], function() {
    return gUtil.log('Gulp is running!');
});