/*

 Plugins

*/
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),

	plumber = require('gulp-plumber'),
	gutil = require('gulp-util'),		
	connect = require('gulp-connect'),
	gulpif = require('gulp-if');


/* 
 
 Defaults

*/
var env = process.env.NODE_ENV || 'development';  //ex. $ NODE_ENV=production gulp
var outputDir = 'builds/development';


/*

 Tasks

*/
gulp.task('jade', function (){
	return gulp.src('src/templates/**/*.jade')
		.pipe(plumber(function(error) {
      gutil.beep();
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
		.pipe(watch())
		.pipe(jade())
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('js', function(){
	return gulp.src('src/js/main.js')
		.pipe(plumber(function(error) {
      gutil.beep();
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
		.pipe(watch())
		.pipe(browserify({ debug: env === 'development' }))
		.pipe(gulpif(env === 'production', uglify({outSourceMap: true})))
		.pipe(gulp.dest(outputDir + '/js'))
		.pipe(connect.reload());
});

gulp.task('sass',function(){
	var config = {};

	if (env === 'development'){
		config.sourceComments = 'map';
	}

	if (env === 'production') {
		config.outputStyle = 'compressed';
	}

	return gulp.src('src/sass/main.scss')
		.pipe(plumber(function(error) {
      gutil.beep();
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
		.pipe(watch())
		.pipe(sass(config))
		.pipe(gulp.dest(outputDir + '/css'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('src/templates/**/*.jade', ['jade']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('connect', function(){
	connect.server({
		root: [outputDir],
		livereload: true
	});
});

gulp.task('default', ['js', 'jade', 'sass', 'watch', 'connect']);