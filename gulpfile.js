"use strict";
const gulp = require('gulp');
const mainNpmFiles = require('npmfiles');
const plugins = require('gulp-load-plugins')(/*{DEBUG: true}*/);
const lazypipe = require('lazypipe');
//nop/noop ; filter ;
const del = require('del');
//const once = require('async-once');
const browserSync = require('browser-sync').create();
const options = require("minimist")(process.argv.slice(2));

const buildFolder = "vendor";

function gfn(_name, fn, _description, _flags) {
    if(_name) fn.displayName = fn.taskName = _name;
    if(_description) fn.description = _description;
    if(_flags) fn.flags = _flags;
    return fn;
}

gulp.task(gfn('build:deps', function build_deps() {
        return gulp.src(mainNpmFiles())
            .pipe(!options.production ? plugins.plumber() : plugins.noop())
            //.pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(options.production ? plugins.ignore("*.map") : plugins.noop())
            .pipe(plugins.debug({title: 'deps-debug'/*, showFiles: false*/}))
            //.pipe(3rd)
            //.pipe(plugins.sourcemaps.write())
            .pipe(!options.production ? plugins.plumber.stop() : plugins.noop())
            .pipe(gulp.dest(buildFolder+'/libs'));
    },
    'Copy third party libraries from /node_modules into /{buildFolder}'));

gulp.task(gfn('build:src', function build_src() {
        return gulp.src('./src/**/*')
            .pipe(!options.production ? plugins.plumber() : plugins.noop())
            .pipe(plugins.debug({title: 'src-debug'}))
            .pipe(plugins.sourcemaps.init())
            //.pipe(3rd)
            .pipe(plugins.sourcemaps.write())
            .pipe(!options.production ? plugins.plumber.stop() : plugins.noop())
            .pipe(gulp.dest('./'+buildFolder))
            .pipe(plugins.debug({title: 'dest-debug'}));
        //.pipe(plugins.preservetime());
    },
    'Copy source files from /src into /{buildFolder}'));

gulp.task(gfn('vendor', gulp.parallel('build:src'), 'Alias for legacy'));

gulp.task(gfn('build', gulp.series('build:deps', 'build:src'), 'Builds entire project.\nDefine environment in NODE_ENV env or by argument.', {
    '--development': 'If build for development (default)',
    '--production': 'If build for production environment'
}));

// Default task
//gulp.task('default', plugins.taskListing); //TODO: find how show --tasks of gulp-cli

gulp.task(gfn('clean:build', function clean_build() {
        return del(['./'+buildFolder]);
    },
    'Delete dev build folder'));

gulp.task(gfn('clean:dist', function clean_dist() { //once(function(done) {
        return del(['./dist']/*, done*/);
    },
    'Delete release folder'));

gulp.task(gfn('clean', gulp.parallel('clean:build', 'clean:dist'), 'Full clean'));

gulp.task(gfn('dist', gulp.series('clean', 'build', function dist() {
        return gulp.src('./'+buildFolder+'/**/*')
            .pipe(plugins.mirror(
                plugins.hashsum({/*dest: "dist", force: true,*/ stream: true, hash: "md5"}),
                plugins.hashsum({/*dest: "dist", force: true,*/ stream: true, hash: "sha1"})
            ))
            .pipe(plugins.dedupe())
            .pipe(plugins.debug({title: 'dist-todo'}))
            .pipe(plugins.mirror(
                plugins.zip("ideal-webapp-dist.zip"),
                lazypipe().pipe(plugins.tar, "ideal-webapp-dist.tar").pipe(plugins.gzip)()
            ))
            .pipe(plugins.debug({title: 'dist-debug'}))
            .pipe(gulp.dest("dist"));
    }),
    'For release'));

// Configure the browserSync task
gulp.task('browserSync', function browserSync() {
    return browserSync.init({
        server: {
            baseDir: "./"+buildFolder
        }
    });
});

gulp.task(gfn('dev', gulp.series('build', 'browserSync', function dev(done) {
        gulp.watch('./src/**/*', ['build:src']);
        gulp.watch('./bower.json', ['build:deps']);
        gulp.watch('./'+buildFolder+'/**/*', browserSync.reload);
        done();
    }),
    'Dev task\nWhile open the website in the navigator and refresh each time sources were modified'));


/*
const util = require('util');
console.warn(util.inspect());
 */
