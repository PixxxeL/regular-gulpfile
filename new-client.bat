@echo off

echo ===========================================================================
echo  1. Create bower.json, package.json
echo  2. Download gulpfile.js and skeleton
echo  3. Make directories
echo.

pause && npm init && bower init && ^
npm install gulp gulp-sass gulp-jade gulp-shell gulp-coffee && ^
curl -O https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/gulpfile.js && ^
mkdir jade html coffee js sass css img && ^
cd coffee && ^
curl -O https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/coffee/main.coffee && ^
cd ..\jade && ^
curl -O https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/jade/base.jade && ^
curl -O https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/jade/index.jade && ^
cd ..\sass && ^
curl -O https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/sass/_definitions.sass && ^
curl -O https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/sass/main.sass && ^
cd .. && ^
echo. && echo Job finish!

exit 0
