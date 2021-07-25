# Regular Gulpfile (DEPRECATED)

There is other better project.

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

For development execute:
```shell
gulp
```

For build static project execute:
```shell
gulp build
```

Test builded version at http://127.0.0.1:8090/ after:
```shell
gulp py-demo
```

Also you may zip builded version:
```shell
gulp zip
```

## To Do

* Replace Jade with [Pug](https://pugjs.org/)?
* Replace coffee, jade, sass to src and js, html, fonts, img, css to dst
* Add webpack with JSX
* Add PHP microfw
* Add integration tests
* Add FTP deploy
