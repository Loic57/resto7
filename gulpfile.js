'use strict';
 
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var cssmin       = require('gulp-cssmin');
var jsmin        = require('gulp-jsmin');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');
var fileinclude  = require('gulp-html-extend');
var wait         = require('gulp-wait');
var stripCssComments = require('gulp-strip-css-comments');




gulp.task('includes', function() {
  return  gulp.src('src' + '/{,includes/}/*.html')
    .pipe(fileinclude({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('build'))
});




gulp.task('clean-build', function()
{
	return gulp.src('./build', {read: false}).pipe(clean());
});


gulp.task('reload', function() {
  return browserSync.reload();
});




/********** COMPILE SASS TO CSS AND MOVE TO BUILD FOLDER THEN MINIFY CSS *********/ 
gulp.task('sass', function () {
    return gulp.src('src/sass/import.scss')
      .pipe(wait(500))
    	.pipe(sass().on('error', sass.logError))
    	.pipe(rename('output.css'))
    	.pipe(gulp.dest('build/css'));
});

gulp.task('concat-styles', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free-webfonts/css/**')
      .pipe(concat('plugins.css'))
      .pipe(gulp.dest('build/css'));
});

gulp.task('cssmin', function () {
   return  gulp.src(['build/css/output.css', 'build/css/plugins.css'])
        .pipe(stripCssComments())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});


gulp.task('clean-css', function()
{
	return gulp.src(['build/css/output.css', 'build/css/plugins.css'], {read: false})
      .pipe(clean());
});

gulp.task('styles', function() {
  runSequence('sass', 'concat-styles', 'cssmin', 'clean-css', 'reload');
});
/********** COMPILE SASS TO CSS AND MOVE TO BUILD FOLDER THEN MINIFY CSS *********/ 




/********** CONCAT JS, MINIFY AND DELETE THE UNMINIFIED THEN MOVE TO BUILD FOLDER **********/
gulp.task('concat-scripts', function() {
  	return gulp.src('src/js/*.js')
    	.pipe(concat('output.js'))
    	.pipe(gulp.dest('build/js'));
});

gulp.task('jsmin', function () {
   	return  gulp.src('build/js/output.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js'));
});

gulp.task('clean-js', function()
{
	return gulp.src('build/js/output.js', {read: false}).pipe(clean());
});

gulp.task('scripts', function() {
  runSequence('concat-scripts', 'jsmin', 'clean-js', 'reload');
});
/********** CONCAT JS, MINIFY AND DELETE THE UNMINIFIED THEN MOVE TO BUILD FOLDER **********/


/********** COPY IMG AND FONTS FILES FROM SRC TO BUILD **********/
gulp.task('copy-images', function() {
  return gulp.src('src/images/**').pipe(gulp.dest('build/images'));
});

gulp.task('copy-font-awesome', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/**').pipe(gulp.dest('build/webfonts/'));
});

gulp.task('copy-icons', function() {
    return gulp.src('src/icons/**').pipe(gulp.dest('build/icons'));
});

gulp.task('copy', function() {
  runSequence('copy-images', 'copy-icons', 'copy-font-awesome', 'reload');
});
/********** COPY HTML AND JS FILES FROM SRC TO BUILD **********/



gulp.task('serve', function() {
    browserSync({
        server: "build/"
    });

    gulp.watch('src/sass/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch(['src/*.html', 'src/includes/*.html'], function(){ runSequence('includes', 'reload') });
    gulp.watch(['src/images/*'], ['copy-images']);
});



gulp.task('default', function()
{
  runSequence('build', 'serve');
});


gulp.task('build', function() {
  runSequence('clean-build', 'copy', 'styles', 'scripts', 'includes');
});