'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const copy = requite('gulp-copy');
// Static Server + watching scss/html files

gulp.task('serve', ['sass', 'templates', 'copyfiles'], function() {
  browserSync.init({
    server: './public'
  });
  gulp.watch(["dev/assets/sass/*.scss", "dev/assets/sass/*.sass"], ['sass']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
  gulp.watch("dev/*.jade", ['templates']);
  gulp.watch("dev/assets/images/*.*", ['copyimg']);
  gulp.watch("dev/assets/js/*.*", ['copyjs']);  
});

gullp.task('copyjs', function() {
  return gulp.src('dev/assets/js/*.*')
    .pipe($.copy('public/js/'));
});

gulp.task('copyimg', function() {
  return gulp.src('dev/assets/images/*.*')
    .pipe($.copy('public/images/'));
});

gulp.task( 'sass' , function() {
  return gulp.src("dev/assets/sass/main.sass")
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('templates', function() {
  return gulp.src('dev/*jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('default', ['serve']);