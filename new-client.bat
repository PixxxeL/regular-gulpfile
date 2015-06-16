@echo off

echo ===========================================================================
echo  1. Create bower.json, package.json
echo  2. Download gulpfile.js
echo  3. Make directories
echo.

pause && npm init && bower init && ^
npm install gulp gulp-sass gulp-jade gulp-shell gulp-coffee && ^
curl -O https://raw.githubusercontent.com/PixxxeL/regular-gulpfile/master/gulpfile.js && ^
mkdir jade html coffee js sass css img

exit 0
