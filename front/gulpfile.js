var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-html');

var paths = {
  sass: 'src/scss/**/*.scss',
  html: '*.html'
};

gulp.task('minify-html', function() {
    var opts = {
        conditionals: true,
        spare: true
    };
    return gulp.src(paths.html)
        .pipe(minify(opts))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.html, ['minify-html']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('develop', [
    'minify-html',
    'sass',
    'watch',
    'connect'
]);

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
