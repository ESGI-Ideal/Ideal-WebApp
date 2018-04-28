"use strict";
const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');
//const nop = require('gulp-nop');
const noop = require("gulp-noop");
const plumber = require("gulp-plumber");
const debug = require('gulp-debug');
const preservetime = require('gulp-preservetime');
const hashsum = require("gulp-hashsum");
const browserSync = require('browser-sync').create();
const options = require("minimist")(process.argv.slice(2));

// Copy third party libraries from /node_modules into /vendor
gulp.task('deps', function() {
    return gulp.src(mainBowerFiles({checkExistence: true}))
        .pipe(!options.production ? plumber() : noop())
        .pipe(debug({title: 'deps-debug'/*, showFiles: false*/}))
        //.pipe(3rd)
        //.pipe(!options.production ? plumber.stop() : noop())
        .pipe(gulp.dest('./vendor/libs'));
});

// Copy source files from /src into /vendor
gulp.task('vendor', function() {
    gulp.src('./src/**/*')
        .pipe(!options.production ? plumber() : noop())
        .pipe(debug({title: 'src-debug'}))
        //.pipe(3rd)
        //.pipe(!options.production ? plumber.stop() : noop())
        .pipe(gulp.dest('./vendor'))
        .pipe(preservetime());
});

// Default task
gulp.task('default', ['vendor', 'deps']);

//for
gulp.task('dist', ['deps', 'vendor'], function() {
    return gulp.src('./vendor/**/*')
        .pipe(hashsum({dest: "vendor", force: true, hash: "md5"}))
        .pipe(hashsum({dest: "vendor", force: true, hash: "sha1"}));
});

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
