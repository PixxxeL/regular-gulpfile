var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    jade    = require('gulp-jade'),
    coffee  = require('gulp-coffee'),
    rename  = require('gulp-rename'),
    //repl    = require('gulp-replace'),
    //rimraf  = require('gulp-rimraf'),
    //ftp     = require('vinyl-ftp'),
    shell   = require('gulp-shell');

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
    gulp.watch(paths.coffee, ['coffee']);
});

gulp.task('compile', ['jade', 'sass', 'coffee']);

// Develope task
gulp.task('default', ['compile', 'server', 'watch']);

gulp.task('copy', function () {
    gulp.src('bower_components/html5-boilerplate/dist/css/normalize.css').pipe(gulp.dest('css'));
    gulp.src('bower_components/font-awesome/css/font-awesome.min.css').pipe(gulp.dest('css'));
    gulp.src('bower_components/font-awesome/fonts/*.*').pipe(gulp.dest('fonts'));
    gulp.src('bower_components/jquery-legacy/dist/jquery.min.js')
        .pipe(rename('jquery-1.12.4.min.js'))
        .pipe(gulp.dest('js'));
    gulp.src('bower_components/jquery-modern/dist/jquery.min.js')
        .pipe(rename('jquery-2.2.4.min.js'))
        .pipe(gulp.dest('js'));
    gulp.src('bower_components/respond/dest/respond.min.js').pipe(gulp.dest('js'));
    gulp.src('bower_components/html5shiv/dist/html5shiv.min.js').pipe(gulp.dest('js'));
});

gulp.task('static-build', function () {
    //gulp.src('../build/**/*.*').pipe(rimraf());
    gulp.src('css/*.css').pipe(gulp.dest('../build/css'));
    gulp.src('js/*.js').pipe(gulp.dest('../build/js'));
    gulp.src('img/**/*.{png,jpg,gif,ico}').pipe(gulp.dest('../build/img'));
    gulp.src('fonts/*.*').pipe(gulp.dest('../build/fonts'));
    //gulp.src('scripts/*.php').pipe(gulp.dest('../build'));
    gulp.src('html/index.html').pipe(gulp.dest('../build/html'));
});

// Build static site task
gulp.task('build', ['compile', 'copy', 'static-build']);

// Run static site
gulp.task('py-demo', shell.task(['cd ../build && python -m SimpleHTTPServer 8090']));
gulp.task('php-demo', shell.task(['cd ../build && php -S localhost:8090']));

// FTP Deploy
/*gulp.task('ftp-deploy', function () {
    var conn = ftp.create({
        host:     '',
        user:     '',
        password: '',
        parallel: 10,
        log:      console.log
    });
    gulp.src('../build/**', {base: '.', buffer: false})
        .pipe(conn.dest(''));
});
gulp.task('deploy', ['build', 'ftp-deploy']);*/
