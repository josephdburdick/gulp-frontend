var gulp = require('gulp'),
	jade = require('gulp-jade'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),

	gulpif = require('gulp-if');

var env = process.env.NODE_ENV || 'development';

gulp.task('jade', function (){
	return gulp.src('src/templates/**/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('builds/development'));
});

gulp.task('js', function(){
	return gulp.src('src/js/main.js')
		.pipe(browserify({ debug: env === 'development' }))
		.pipe(gulpif(env === 'production', uglify() ))
		.pipe(gulp.dest('builds/development/js'));
});