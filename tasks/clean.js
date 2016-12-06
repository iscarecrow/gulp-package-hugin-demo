var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('cleandist', function() {
  return gulp.src(['./dist'],{read: false})
    .pipe(clean());
});

gulp.task('cleanrev', function() {
  return gulp.src(['./rev'],{read: false})
    .pipe(clean());
});


gulp.task('cleancdn', function() {
  return gulp.src(['./cdn'],{read: false})
    .pipe(clean());
});

gulp.task('cleanbuild', function() {
  return gulp.src(['./build'],{read: false})
    .pipe(clean({force: true}));
});