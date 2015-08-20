var gulp     = require('gulp');
var istanbul = require('gulp-istanbul');
var jasmine  = require('gulp-jasmine');
var jscs     = require('gulp-jscs');

var src  = './src/**/*.js';
var spec = './spec/**/*.js';

gulp.task('test', function() {
  return gulp.src(spec)
      .pipe(jasmine());
});

gulp.task('coverage', function() {
  return gulp.src(src)
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
      .on('finish', function() {
        gulp.src(spec)
          .pipe(jasmine())
          .pipe(istanbul.writeReports({
            dir: './dist/coverage',
            reporters: ['html', 'text']
          }));
      });
});

gulp.task('style', function() {
  return gulp.src(src)
    .pipe(jscs({
      preset: 'google'
    }));
});

gulp.task('default', ['style', 'test']);

gulp.task('dev', function() {
  gulp.watch([src, spec], ['default']);
});
