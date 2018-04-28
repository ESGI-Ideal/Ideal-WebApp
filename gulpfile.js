"use strict";
const gulp = require('gulp');
const mainNpmFiles = require('npmfiles');
const plugins = require('gulp-load-plugins')();
//nop/noop ; filter ;
const del = require('del');
const browserSync = require('browser-sync').create();
const options = require("minimist")(process.argv.slice(2));

// Copy third party libraries from /node_modules into /vendor
gulp.task('deps', function() {
    return gulp.src(mainNpmFiles())
        .pipe(!options.production ? plugins.plumber() : plugins.noop())
        //.pipe(plugins.sourcemaps.init({loadMaps: true}))
        .pipe(options.production ? plugins.ignore("*.map") : plugins.noop())
        .pipe(plugins.debug({title: 'deps-debug'/*, showFiles: false*/}))
        //.pipe(3rd)
        //.pipe(plugins.sourcemaps.write())
        .pipe(!options.production ? plugins.plumber.stop() : plugins.noop())
        .pipe(gulp.dest('./vendor/libs'));
});

// Copy source files from /src into /vendor
gulp.task('build', function() {
    gulp.src('./src/**/*')
        .pipe(!options.production ? plugins.plumber() : plugins.noop())
        .pipe(plugins.debug({title: 'src-debug'}))
        .pipe(plugins.sourcemaps.init())
        //.pipe(3rd)
        .pipe(plugins.sourcemaps.write())
        .pipe(!options.production ? plugins.plumber.stop() : plugins.noop())
        .pipe(gulp.dest('./vendor'))
        .pipe(plugins.preservetime());
});
//alias for legacy
gulp.task('vendor', ['build']);

// Default task
gulp.task('default', ['vendor', 'deps']);

//for release
gulp.task('dist', ['deps', 'build'], function() {
    return gulp.src('./vendor/**/*')
        .pipe(plugins.hashsum({dest: "vendor", force: true, hash: "md5"}))
        .pipe(plugins.hashsum({dest: "vendor", force: true, hash: "sha1"}));
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
