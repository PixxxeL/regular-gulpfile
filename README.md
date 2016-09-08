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
* [cURL](https://curl.haxx.se/download.html) (for Windows only)

## Usage

Windows:
```batch
new-client.bat
```

Linux (not implemented yet):
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

and may browse it at http://127.0.0.1:8090/ with:
```shell
gulp demo
```

## To Do

* Create Linux script
* Add includes to sass and scripts to base.jade
