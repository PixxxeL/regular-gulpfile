@echo off

set REPO_URL=https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/

echo ===========================================================================
echo  1. Create bower.json, package.json
echo  2. Download gulpfile.js and skeleton
echo  3. Make directories
echo.

pause && npm init && bower init && ^
npm install gulp gulp-sass gulp-jade gulp-shell gulp-coffee && ^
curl -O %REPO_URL%gulpfile.js && ^
mkdir jade html coffee js sass css img && ^
bower install jquery html5-boilerplate && ^
cp bower_components/jquery/dist/jquery.min.js js/jquery.min.js && ^
cp bower_components/html5-boilerplate/dist/css/normalize.css css/normalize.css && ^
cd coffee && ^
curl -O %REPO_URL%coffee/main.coffee && ^
cd ..\jade && ^
curl -O %REPO_URL%jade/base.jade && ^
curl -O %REPO_URL%jade/index.jade && ^
cd ..\sass && ^
curl -O %REPO_URL%sass/_definitions.sass && ^
curl -O %REPO_URL%sass/main.sass && ^
cd .. && ^
echo. && echo Job finish!

exit 0
