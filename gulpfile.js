"use strict";
const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');
const browserSync = require('browser-sync').create();

gulp.task('deps', function() {
    return gulp.src(mainBowerFiles({
        checkExistence: true
    }))
        .pipe(gulp.dest('./vendor/libs'));
});

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {
    gulp.src('./src/**/*')
        .pipe(gulp.dest('./vendor'));
});

// Default task
gulp.task('default', ['vendor', 'deps']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./vendor"
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
    gulp.watch('./src/**/*', ['vendor']);
    gulp.watch('./bower.json', ['deps']);
    gulp.watch('./vendor/**/*', browserSync.reload);
});
