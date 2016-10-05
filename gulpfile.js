// /**
//  * Created by Maria_Kuznetsova on 10/5/2016.
//  */
// 'use strict';
//
// var gulp = require('gulp');
// var browserify = require('browserify');
// var server = require('gulp-express');
//
// // var plugins = require('gulp-load-plugins')();
//
// var transform = require('vinyl-transform');
// var through2 = require('through2');

// // gulp.task('browserify', function () {
// //     return browserify({
// //         entries: 'script/index.js',
// //         extensions: ['.js'],
// //         debug: true
// //     });
// // });
//
// gulp.task('browserify', function () {
//     var browserified = transform(function(filename) {
//         return browserify(filename).bundle();
//     });
//
//     // return gulp.src('index.js')
//     //     .pipe(through2.obj(function (file, enc, next){
//     //         browserify(file.path)
//     //             .bundle(function(err, res){
//     //                 file.contents = res;
//     //                 next(null, file);
//     //             });
//     //     }))
//     //     .pipe(gulp.dest('./output/'));
//     return gulp.src('./app/')
//         .pipe(plugin.webserver({
//             host: '0.0.0.0',
//             port: 8080,
//             open: true,
//             fallback: './index.html'
//         }));
// });
//
// gulp.task('server', function () {
//     server.run(['server.js']);
// });
//
// gulp.task('watch', function () {
//     gulp.watch(['script/*.js'], ['browserify']);
//     gulp.watch(['styles/*.css'], ['browserify']);
// });
//
// gulp.task('lint', function () {
//     return gulp.src('script/*.js')
//         .pipe(plugins.eslint())
//         .pipe(plugins.eslint.format())
//         .pipe(plugins.eslint.failAfterError());
// });
//
// gulp.task('default', ['lint', 'browserify', 'server', 'watch']);
// gulp.task('pre-commit', ['lint']);

var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var through2 = require('through2');
var server = require('gulp-express');
gulp.task('browserify', function () {
    var browserified = transform(function (filename) {
        return browserify(filename).bundle();
    });

    return gulp.src('script/index.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
                .bundle(function (err, res) {
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(gulp.dest('./output/'));
});


gulp.task('server', function () {
    server.run(['server.js']);
});

gulp.task('watch', function () {
    gulp.watch(['script/*.js'], ['browserify']);
});


gulp.task('default', ['browserify', 'server', 'watch']);
