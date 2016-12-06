var  gulp = require('gulp');
var  uglify = require('gulp-uglify');
var  concat = require('gulp-concat');
var  minifyCSS = require('gulp-minify-css');
var  rjs = require('requirejs');
var  runSequence = require('gulp-run-sequence');
var  RevAll = require('gulp-rev-all');
var  revReplace = require("gulp-rev-replace");
var  clean = require('gulp-clean');

// uglify
gulp.task('jsuglify', function() {
  return gulp.src('./static/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('cssmin', function() {
  return gulp.src(
      './static/css/**/*.css'
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('cdn-copy', function(){
  return gulp.src('./cdn/**/*')
    .pipe(gulp.dest('./build/static/'));
});

// 加戳 + 生成Map
gulp.task('rev', function() {
  var revAll = new RevAll();
  return gulp.src(['dist/**/*.js','dist/**/*.css'])
    .pipe(revAll.revision())
    .pipe(gulp.dest('cdn'))
    .pipe(revAll.versionFile())
    .pipe(gulp.dest('rev'))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('rev'));
});

gulp.task('rev-copy', function(){
  return gulp.src('./rev/**/*')
    .pipe(gulp.dest('./build/'));
});

// 替换模版对应的戳
gulp.task("revreplace", function(){
  var manifest = gulp.src('./rev/rev-manifest.json');
  return gulp.src("./view/**/*")
    .pipe(revReplace({
      replaceInExtensions: ['.css','.js','.html'],
      manifest: manifest
    }))
    .pipe(gulp.dest('./build/view'));
});

gulp.task('build', function(callback) {
  runSequence(
    // 清除文件
    ['cleanrev','cleandist','cleancdn','cleanbuild'],
    // 压缩
    ['jsuglify','cssmin'],
    // 加戳
    'rev',
    // 替换模版js对应的戳
    'revreplace',
    // 加戳资源拷贝
    'cdn-copy',
    // 加戳map文件拷贝
    'rev-copy',
    // 清除流程中产生的文件
    ['cleandist','cleanrev','cleancdn'],
    callback);
});