var gulp = require('gulp'),
		jade = require('gulp-jade'),
		browserify = require('gulp-browserify'),
		uglify = require('gulp-uglify'),
		sass = require('gulp-sass'),

		gulpif = require('gulp-if');

var env = process.env.NODE_ENV || 'development';
var outputDir = 'builds/development';

gulp.task('jade', function (){
	return gulp.src('src/templates/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest(outputDir));
});

gulp.task('js', function(){
	return gulp.src('src/js/main.js')
		.pipe(browserify({ debug: env === 'development' }))
		.pipe(gulpif(env === 'production', uglify() ))
		.pipe(gulp.dest(outputDir + '/js'));
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
		.pipe(sass(config))
		.pipe(gulp.dest(outputDir + '/css'));
});

gulp.task('watch', function() {
	gulp.watch('src/templates/**/*.jade', ['jade']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'jade', 'sass', 'watch']);