var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    jade   = require('gulp-jade'),
    shell  = require('gulp-shell'),
    coffee = require('gulp-coffee');

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
        }))
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
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('js'))
    ;
});
 
gulp.task('server', shell.task(['python -m SimpleHTTPServer 8090']));

gulp.task('watch', function () {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.sass, ['coffee']);
});

gulp.task('default', ['jade', 'sass', 'coffee', 'server', 'watch']);

gulp.task('build', function () {
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

gulp.task('demo', shell.task(['cd build && python -m SimpleHTTPServer 8090']));
