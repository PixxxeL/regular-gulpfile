@echo off

set REPO_URL=https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/

echo ===========================================================================
echo  1. Create bower.json, package.json
echo  2. Download gulpfile.js and skeleton
echo  3. Make directories
echo.

pause && npm init && bower init && ^
npm install --save gulp gulp-sass gulp-jade gulp-shell gulp-coffee && ^
curl -O %REPO_URL%gulpfile.js && ^
mkdir jade html coffee js sass css img fonts && ^
bower install --save jquery#2.2.4 html5-boilerplate font-awesome && ^
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
