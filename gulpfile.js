// Load Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    msx = require('gulp-msx'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    webpackGulp = require('gulp-webpack'),
    webpack = require('webpack'),
    webpackConfig = require("./webpack.config.js"),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    path = require('path'),
    runSequence = require('run-sequence');


var argv = require('yargs').argv;



// Styles
gulp.task('styles', function() {
    return gulp.src('less/semantic.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({
            basename: 'app',
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(rename({
            basename: 'app',
            suffix: '.min'
        }))
        .pipe(cleanCSS({
                keepSpecialComments: 0,
                compatibility: 'ie8',
                debug: true
            },
            function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }
        ))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});


//for Mithriljs views
gulp.task('transform-jsx', function() {
    return gulp.src('client/src/**/*.jsx')
        .pipe(msx({
            harmony: false
        }))
        .pipe(gulp.dest('client/modules/'))
})

gulp.task('jsx', function(done) {
    runSequence('transform-jsx', 'webpack', function() {
        console.log('Run something else');
        done();
    });
});

gulp.task('webpack', function() {
    return gulp.src(['client/src/*.js', 'client/src/**/*.js'])
        .pipe(webpackGulp(webpackConfig))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public'))
        .pipe(notify({
            message: 'webpack task complete'
        }))
        .pipe(livereload())
})


gulp.task('pack-plugins', function() {
    return gulp.src(['client/plugins/jquery.slim.min.js', 'client/plugins/*'])
        .pipe(concat('plugins.min.js'))
        .pipe(gulp.dest('public/'))
        .pipe(notify({
            message: 'Pack plugins task complete'
        }))
        .pipe(livereload())
})



// Launch a lightweight HTTP Server
gulp.task('run', function(next) {
    var url = require('url'),
        fileServer = require('ecstatic')({
            root: './',
            cache: 'no-cache',
            showDir: true
        }),
        port = 2709;
    require('http').createServer()
        .on('request', function(req, res) {
            // For non-existent files output the contents of /index.html page in order to make HTML5 routing work
            var urlPath = url.parse(req.url).pathname;
            if (urlPath === '/') {
                req.url = '/index.html';
            } else if (
                ['css', 'html', 'ico', 'woff2', 'woff', 'ttf', 'less', 'js.map', 'js', 'png', 'txt', 'xml'].indexOf(urlPath.split('.').pop()) == -1 &&
                ['bower_components', 'fonts', 'images', 'src', 'vendor', 'views'].indexOf(urlPath.split('/')[1]) == -1) {
                req.url = '/index.html';
            } else if (['src', 'bower_components'].indexOf(urlPath.split('/')[1]) == -1) {
                req.url = '/' + req.url;
            }
            fileServer(req, res);
        })
        .listen(port, function() {
            gutil.log('Server is listening on ' + gutil.colors.magenta('http://localhost:' + port + '/'));
            next();
        });
});



gulp.task('watch', function() {
    gulp.watch(['client/plugins/**/*.js'], ['pack-plugins'])
    gulp.watch(['client/*.js', 'client/src/**/*.js'], ['webpack'])
    gulp.watch(['client/src/**/*.jsx'], ['jsx'])
    gulp.watch(['less/*.less'], ['styles'])
    livereload.listen();
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', ['run'], function() {
    //server = plugins.serve.static('/', 8081);
    //server.start();
    gulp.watch(['*.html']);
});



gulp.task('default', ['styles', 'pack-plugins', 'jsx'])

var server = ['pack-plugins', 'jsx', 'serve', 'watch']

gulp.task('server', server);