# Regular Gulpfile

This is intend for simplify HTML/CSS coding on
[Jade](http://jade-lang.com/) instead HTML,
[SASS](http://sass-lang.com/) instead CSS
and [CoffeeScript](http://coffeescript.org/) instead Javascript.
Using this you can create static web pages.

## Dependencies

* [Python](https://www.python.org/downloads/) for local server
* [Node](https://nodejs.org/en/download/) with [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
* [Gulp](http://gulpjs.com/)
* [Bower](https://bower.io/)
* [cURL](https://curl.haxx.se/download.html) (for Windows only)

## Usage

For create new project on Windows download `new-client.bat` file and run it:
```batch
new-client.bat
```

For create new project on Linux download `new-client.sh` file and run it:
```shell
new-client.sh
```

This create skeleton for coding.

For coding execute:
```shell
gulp
```
and browse http://127.0.0.1:8090/html/

For build static project execute:
```shell
gulp build
```

and may browse it at http://127.0.0.1:8090/ after:
```shell
gulp demo
```

## To Do

* Add scripts to base.jade
* Add compress and concatenation of CSS and JS files
