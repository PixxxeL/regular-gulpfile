var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    jade   = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    repl   = require('gulp-replace'),
    shell  = require('gulp-shell');

var paths = {
    'sass'   : './sass/*.sass',
    'jade'   : './jade/*.jade',
    'coffee' : './coffee/*.coffee'
};

gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass({
            indentedSyntax: true
            //sourceComments : true
        }).on('error', sass.logError))
        .pipe(gulp.dest('css'))
    ;
});

gulp.task('jade', function () {
    gulp.src(paths.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('html'))
    ;
});

gulp.task('coffee', function () {
    gulp.src(paths.coffee)
        .pipe(coffee({
            bare: true
        }).on('error', function (err) {
            console.log(err);
        }))
        .pipe(gulp.dest('js'))
    ;
});
 
gulp.task('server', shell.task(['python -m SimpleHTTPServer 8090']));

gulp.task('watch', function () {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.sass, ['coffee']);
});

gulp.task('compile', ['jade', 'sass', 'coffee']);

// Develope task
gulp.task('default', ['compile', 'server', 'watch']);

gulp.task('copy', function () {
    gulp.src('css/*.css').pipe(gulp.dest('build/css'));
    gulp.src('bower_components/html5-boilerplate/dist/css/normalize.css').pipe(gulp.dest('build/css'));
    gulp.src('bower_components/font-awesome/css/font-awesome.min.css').pipe(gulp.dest('build/css'));
    gulp.src('bower_components/font-awesome/fonts/*.*').pipe(gulp.dest('build/fonts'));
    gulp.src('js/*.js').pipe(gulp.dest('build/js'));
    gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('build/js'));
    gulp.src('img/**/*.{png,jpg,gif,ico}').pipe(gulp.dest('build/img'));
    gulp.src('html/index.html')
        .pipe(repl('/bower_components/html5-boilerplate/dist/', '/'))
        .pipe(repl('/bower_components/font-awesome/', '/'))
        .pipe(repl('/bower_components/jquery/dist/', '/js/'))
        .pipe(gulp.dest('build'));
});

// Build static site task
gulp.task('build', ['jade', 'sass', 'coffee', 'copy']);

// Run static site
gulp.task('demo', shell.task(['cd build && python -m SimpleHTTPServer 8090']));
