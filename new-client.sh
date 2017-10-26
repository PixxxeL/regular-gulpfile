#!/bin/bash

if ! which python > /dev/null; then
    echo ERROR: You must install Python first
    return 1
fi

if ! which nodejs > /dev/null; then
    echo ERROR: You must install Node.js first
    return 1
fi

if ! which npm > /dev/null; then
    echo ERROR: You must install NPM for Node.js first
    return 1
fi

if ! which gulp > /dev/null; then
    echo ERROR: You must install Gulp for Node.js first
    return 1
fi

if ! which bower > /dev/null; then
    echo ERROR: You must install Bower for Node.js first
    return 1
fi

REPO_URL=https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/

echo ===========================================================================
echo  1. Create bower.json, package.json
echo  2. Download gulpfile.js and skeleton
echo  3. Make directories
echo

read -rsp $'Press any key to continue...\n' -n 1 key

npm init && bower init &&
mkdir -p jade html coffee js sass css img fonts &&
npm install --save gulp gutil del gulp-sass gulp-jade gulp-coffee gulp-shell \
gulp-rename gulp-sourcemaps gulp-yuicompressor gulp-concat gulp-zip \
gulp-html-replace &&
bower install --save jquery-legacy=jquery#1.12.4 jquery-modern=jquery#2.2.4 \
html5-boilerplate font-awesome html5shiv respond &&
wget $REPO_URL"gulpfile.js" -O gulpfile.js &&
wget $REPO_URL"coffee/main.coffee" -O coffee/main.coffee &&
wget $REPO_URL"jade/base.jade" -O jade/base.jade &&
wget $REPO_URL"jade/index.jade" -O jade/index.jade &&
wget $REPO_URL"sass/_definitions.sass" -O sass/_definitions.sass &&
wget $REPO_URL"sass/main.sass" -O sass/main.sass &&
wget $REPO_URL"img/favicon.ico" -O img/favicon.ico &&
wget $REPO_URL"img/favicon.png" -O img/favicon.png &&
gulp compile && gulp copy &&
rm new-client.sh &&
echo && echo Job finish!
