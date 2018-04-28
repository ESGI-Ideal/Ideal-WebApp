"use strict";
const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');
//const nop = require('gulp-nop');
const noop = require("gulp-noop");
const plumber = require("gulp-plumber");
const debug = require('gulp-debug');
const preservetime = require('gulp-preservetime');
const hashsum = require("gulp-hashsum");
const sourcemaps = require('gulp-sourcemaps');
//const filter = require('gulp-filter');
const ignore = require('gulp-ignore');
const del = require('del');
const browserSync = require('browser-sync').create();
const options = require("minimist")(process.argv.slice(2));

// Copy third party libraries from /node_modules into /vendor
gulp.task('deps', function() {
    return gulp.src(mainBowerFiles({
        checkExistence: true,
        env: (options.production && !options.development) ? "production" : "development"
    }))
        .pipe(!options.production ? plumber() : noop())
        //.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(options.production ? ignore("*.map") : noop())
        .pipe(debug({title: 'deps-debug'/*, showFiles: false*/}))
        //.pipe(3rd)
        //.pipe(sourcemaps.write())
        .pipe(!options.production ? plumber.stop() : noop())
        .pipe(gulp.dest('./vendor/libs'));
});

// Copy source files from /src into /vendor
gulp.task('build', function() {
    gulp.src('./src/**/*')
        .pipe(!options.production ? plumber() : noop())
        .pipe(debug({title: 'src-debug'}))
        .pipe(sourcemaps.init())
        //.pipe(3rd)
        .pipe(sourcemaps.write())
        .pipe(!options.production ? plumber.stop() : noop())
        .pipe(gulp.dest('./vendor'))
        .pipe(preservetime());
});
//alias for legacy
gulp.task('vendor', ['build']);

// Default task
gulp.task('default', ['vendor', 'deps']);

//for release
gulp.task('dist', ['deps', 'build'], function() {
    return gulp.src('./vendor/**/*')
        .pipe(hashsum({dest: "vendor", force: true, hash: "md5"}))
        .pipe(hashsum({dest: "vendor", force: true, hash: "sha1"}));
});

//cleaning project dir
gulp.task('clean:build', function () {
    return del(['./vendor']);
});

//cleaning project dir
gulp.task('clean:dist', function () {
    return del(['./dist']);
});

//full clean
gulp.task('clean', ['clean:build', 'clean:dist']);

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
