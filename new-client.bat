@echo off

where /Q node
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: You must install Node.js first
    goto ENDSCRIPT
)

where /Q npm
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: You must install NPM for Node.js first
    goto ENDSCRIPT
)

where /Q gulp
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: You must install Gulp for Node.js first
    goto ENDSCRIPT
)

where /Q bower
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: You must install Bower for Node.js first
    goto ENDSCRIPT
)

where /Q python
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: You must install Python first
    goto ENDSCRIPT
)

where /Q curl
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: You must install cURL first
    goto ENDSCRIPT
)

set REPO_URL=https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/

echo ===========================================================================
echo  1. Create bower.json, package.json
echo  2. Download gulpfile.js and skeleton
echo  3. Make directories
echo.

pause && npm init && bower init && ^
mkdir jade html coffee js sass css img fonts build && ^
npm install --save gulp gutil del gulp-sass gulp-jade gulp-coffee gulp-shell ^
gulp-rename gulp-sourcemaps gulp-yuicompressor gulp-concat gulp-zip ^
gulp-html-replace && ^
bower install --save jquery-legacy=jquery#1.12.4 jquery-modern=jquery#2.2.4 ^
html5-boilerplate font-awesome html5shiv respond && ^
curl -O %REPO_URL%gulpfile.js && ^
cd coffee && ^
curl -O %REPO_URL%coffee/main.coffee && ^
cd ..\jade && ^
curl -O %REPO_URL%jade/base.jade && ^
curl -O %REPO_URL%jade/index.jade && ^
cd ..\sass && ^
curl -O %REPO_URL%sass/_definitions.sass && ^
curl -O %REPO_URL%sass/main.sass && ^
cd .. && gulp compile && gulp copy && ^
echo. && echo Job finish!

:ENDSCRIPT
