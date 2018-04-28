"use strict";
const gulp = require('gulp');
const mainNpmFiles = require('npmfiles');
const plugins = require('gulp-load-plugins')(/*{DEBUG: true}*/);
//nop/noop ; filter ;
const del = require('del');
//const once = require('async-once');
const browserSync = require('browser-sync').create();
const options = require("minimist")(process.argv.slice(2));

const buildFolder = "vendor";

/**
 * Copy third party libraries from /node_modules into /{buildFolder}
 *
 * @task {build:deps}
 * @group {Building tasks}
 */
gulp.task('build:deps', function() {
    return gulp.src(mainNpmFiles())
        .pipe(!options.production ? plugins.plumber() : plugins.noop())
        //.pipe(plugins.sourcemaps.init({loadMaps: true}))
        .pipe(options.production ? plugins.ignore("*.map") : plugins.noop())
        .pipe(plugins.debug({title: 'deps-debug'/*, showFiles: false*/}))
        //.pipe(3rd)
        //.pipe(plugins.sourcemaps.write())
        .pipe(!options.production ? plugins.plumber.stop() : plugins.noop())
        .pipe(gulp.dest('./'+buildFolder+'/libs'));
});

/**
 * Copy source files from /src into /{buildFolder}
 *
 * @task {build:src}
 * @group {Building tasks}
 */
gulp.task('build:src', function() {
    gulp.src('./src/**/*')
        .pipe(!options.production ? plugins.plumber() : plugins.noop())
        .pipe(plugins.debug({title: 'src-debug'}))
        .pipe(plugins.sourcemaps.init())
        //.pipe(3rd)
        .pipe(plugins.sourcemaps.write())
        .pipe(!options.production ? plugins.plumber.stop() : plugins.noop())
        .pipe(gulp.dest('./'+buildFolder))
        .pipe(plugins.preservetime());
});
//alias for legacy
gulp.task('vendor', ['build:src']);

/**
 * Builds entire project.
 * Define environment in NODE_ENV env or by argument.
 *
 * @task {build}
 * @group {Building tasks}
 * @order {1}
 * @arg {development} If build for development (default)
 * @arg {production} If build for production environment
 */
gulp.task('build', ['build:deps', 'build:src']); //gulp.series('', '')

/**
 * For release
 *
 * @task {dist}
 */
gulp.task('dist', gulp.series('clean', 'build', function() {
    return gulp.src('./'+buildFolder+'/**/*')
        .pipe(plugins.hashsum({dest: buildFolder, force: true, hash: "md5"}))
        .pipe(plugins.hashsum({dest: buildFolder, force: true, hash: "sha1"}));
}));

// Default task
gulp.task('default', ['help']);

/**
 * List all Gulp's tasks
 * @task {tasks}
 * @group {Help}
 */
gulp.task('tasks', plugins.taskListing);

/**
 * Display this help
 * @task {help}
 * @group {Help}
 */
gulp.task('help', function() {
    return plugins.helpDoc(gulp);
});

/**
 * Delete dev build folder
 *
 * @task {clean:build}
 * @group {Cleaning}
 */
gulp.task('clean:build', function() {
    return del(['./'+buildFolder]);
});

/**
 * Delete release folder
 *
 * @task {clean:build}
 * @group {Cleaning}
 */
gulp.task('clean:dist', function() { //once(function(done) {
    return del(['./dist']/*, done*/);
});

/**
 * Full clean
 *
 * @task {clean:build}
 * @group {Cleaning}
 */
gulp.task('clean', gulp.parallel('clean:build', 'clean:dist'));

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"+buildFolder
    }
  });
});

/**
 * Dev task
 * While open the website in the navigator and refresh each time sources were modified
 *
 * @task {dev}
 */
// @group {Misc}
gulp.task('dev', gulp.series('build', 'browserSync', function() {
    gulp.watch('./src/**/*', ['build:src']);
    gulp.watch('./bower.json', ['build:deps']);
    gulp.watch('./'+buildFolder+'/**/*', browserSync.reload);
}));
