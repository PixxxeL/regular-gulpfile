var gulp       = require('gulp'),
    gutil      = require('gutil'),
    del        = require('del'),
    sass       = require('gulp-sass'),
    jade       = require('gulp-jade'),
    coffee     = require('gulp-coffee'),
    rename     = require('gulp-rename'),
    //replStr    = require('gulp-replace'),
    //ftp        = require('vinyl-ftp'),
    sourcemaps = require('gulp-sourcemaps'),
    compress   = require('gulp-yuicompressor'),
    concat     = require('gulp-concat'),
    replHtml   = require('gulp-html-replace'),
    zip        = require('gulp-zip'),
    shell      = require('gulp-shell');

var HOST   = '127.0.0.1',
    PORT   = 8090,
    SERVER = HOST + ':' + PORT,
    GA     = '', // if you need Google Analytics
    DEBUG  = true,
    IS_PHP = false; // if you need PHP microfw

var paths = {
    'sass'   : './sass/**/*.sass',
    'jade'   : './jade/**/*.jade',
    'coffee' : './coffee/**/*.coffee',
    'build'  : 'build' // I'm using ../../build
};

var separateJsFiles = [
    'js/html5shiv.min.js', 'js/respond.min.js',
    'js/jquery-1.12.4.min.js', 'js/jquery-2.2.4.min.js'
];

/**
 * Add js files here for compress and concatenate
 */
var concatenatedJsFiles = [
    'js/main.js'
];

/**
 * Add css files here for compress and concatenate
 */
var concatenatedCssFiles = [
    'css/normalize.css',
    'css/main.css'
];

var errHandler = function (err) {
    gutil.log('Error', err);
};


gulp.task('sass', function () {
    var output = DEBUG ? 'expanded' : 'compressed';
    var pipe = gulp.src(paths.sass);
    if (DEBUG) {
        pipe = pipe.pipe(sourcemaps.init());
    }
    pipe = pipe.pipe(sass({ // https://github.com/sass/node-sass#includepaths
        indentWidth : 4,
        outputStyle : output
    }).on('error', errHandler));
    if (DEBUG) {
        pipe = pipe.pipe(sourcemaps.write());
    }
    pipe.pipe(gulp.dest('css'));
});

gulp.task('coffee', function () {
    var pipe = gulp.src(paths.coffee);
    if (DEBUG) {
        pipe = pipe.pipe(sourcemaps.init());
    }
    pipe = pipe.pipe(coffee({
        bare: true
    })).on('error', errHandler);
    if (DEBUG) {
        pipe = pipe.pipe(sourcemaps.write());
    }
    pipe.pipe(gulp.dest('js'));
});

gulp.task('jade', function () {
    var pipe = gulp.src(paths.jade);
    if (DEBUG) {
        pipe = pipe.pipe(sourcemaps.init());
    }
    pipe = pipe.pipe(jade({
        pretty: true
    })).on('error', errHandler);
    if (DEBUG) {
        pipe = pipe.pipe(sourcemaps.write());
    }
    pipe.pipe(gulp.dest('html'));
});
 
gulp.task('py-server', shell.task(['python -m SimpleHTTPServer ' + PORT]));
gulp.task('php-server', shell.task(['php -S ' + SERVER]));

gulp.task('browse', shell.task(['start http://' + SERVER + '/html/']));

gulp.task('watch', function () {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.coffee, ['coffee']);
});

gulp.task('compile', ['jade', 'sass', 'coffee']);

/**
 * Development task
 */
gulp.task('default', ['compile', 'py-server', 'watch', 'browse']);


/**
 * Copy Bower libs
 */
gulp.task('copy', function () {
    console.log('\n\tCopy Bower libraries...\n');
    gulp.src('bower_components/html5-boilerplate/dist/css/normalize.css')
        .pipe(gulp.dest('css'));
    gulp.src('bower_components/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('css'));
    gulp.src('bower_components/font-awesome/fonts/*.*').pipe(gulp.dest('fonts'));
    gulp.src('bower_components/jquery-legacy/dist/jquery.min.js')
        .pipe(rename('jquery-1.12.4.min.js'))
        .pipe(gulp.dest('js'));
    gulp.src('bower_components/jquery-modern/dist/jquery.min.js')
        .pipe(rename('jquery-2.2.4.min.js'))
        .pipe(gulp.dest('js'));
    gulp.src('bower_components/respond/dest/respond.min.js')
        .pipe(gulp.dest('js'));
    gulp.src('bower_components/html5shiv/dist/html5shiv.min.js')
        .pipe(gulp.dest('js'));
});

/**
 * Minify, concatenate fro build
 */
gulp.task('static-build', function () {
    console.log('\n\tBuild static files...');
    console.log('\tDEBUG is:', DEBUG, '\n');
    var htmlDir = '';
    gulp.src('img/**/*.{png,jpg,gif,ico}').pipe(gulp.dest(paths.build + '/img'));
    gulp.src('fonts/*.*').pipe(gulp.dest(paths.build + '/fonts'));
    if (IS_PHP) {
        gulp.src('scripts/*.php').pipe(gulp.dest(paths.build));
        htmlDir = '/html';
    }
    gulp.src('css/font-awesome.min.css')
        .pipe(gulp.dest(paths.build + '/css'));
    gulp.src(concatenatedCssFiles)
        .pipe(compress({ type: 'css' }))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(paths.build + '/css'));
    gulp.src(separateJsFiles).pipe(gulp.dest(paths.build + '/js'));
    gulp.src(concatenatedJsFiles)
        .pipe(compress({ type: 'js' }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.build + '/js'));
    gulp.src('html/index.html')
        .pipe(replHtml({
            'css': '/css/styles.min.css',
            'js' : '/js/app.min.js',
            'ga' : DEBUG ? '' : GA
        }))
        //.pipe(replStr(/"\/js\//g, '"js/'))
        //.pipe(replStr(/"\/css\//g, '"css/'))
        //.pipe(replStr(/"[^"]+\/img\//g, '"img/'))
        .pipe(gulp.dest(paths.build + htmlDir));
});

/**
 * Set DEBUG to false for build
 */
gulp.task('undebug', function () {
    DEBUG = false;
});

/**
 * Cleanup build directory
 */
gulp.task('cleanup', function () {
    console.log('\n\tCleanup build directory...\n');
    del(paths.build + '/**/*', {force:true});
});

/**
 * Zip build directory
 */
gulp.task('zip', function () {
    var now = new Date;
    gulp.src(paths.build + '/**/*.*')
        .pipe(zip(
            'build-' + now.toLocaleString().replace(/ /, '-').replace(/:/g, '-') + '.zip'
        ))
        .pipe(gulp.dest(paths.build + '/..'))
    ;
});

/**
 * Subtasks for build
 */
gulp.task('pro-compile', ['undebug', 'compile']);
gulp.task('pro-build', ['undebug', 'static-build']);

/**
 * Build task
 */
gulp.task('build', shell.task([
    'gulp cleanup && gulp copy && gulp pro-compile && gulp pro-build'
]));

/**
 * Run static site
 */
gulp.task('py-demo', shell.task([
    'cd ' + paths.build + ' && python -m SimpleHTTPServer ' + PORT
]));
gulp.task('php-demo', shell.task([
    'cd ' + paths.build + ' && php -S ' + SERVER
]));

/**
 * Deploy through FTP
 * https://www.npmjs.com/package/vinyl-ftp
 */
/*gulp.task('ftp-deploy', function () {
    var conn = ftp.create({
        host:     '',
        user:     '',
        password: '',
        parallel: 10,
        log:      console.log
    });
    gulp.src(paths.build + '/**', {base: '.', buffer: false})
        .pipe(conn.dest(''));
});
gulp.task('deploy', ['build', 'ftp-deploy']);*/
