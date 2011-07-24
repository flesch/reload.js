# reload.js

`reload.js` will watch your [node.js](http://nodejs.org/) application and restart **node** when a change is made. It should make testing and developing your application a little easier.

`reload.js` is an anonymous function that's called recursively (via `arguments.callee`), which is pretty neat, but otherwise it pretty much does [what](http://github.com/ripter/node.runner) [other](http://github.com/remy/nodemon) "[hot](http://gist.github.com/520253) [loaders](http://github.com/weepy/bounce)" [do](http://stackoverflow.com/questions/1972242/auto-reload-of-files-in-node-js).

If you use it or have suggestions, let me know!

  - Twitter: [@johnflesch](http://twitter.com/#!/johnflesch)
  - Email: john (at) fles.ch

## Installing

It's just a single file, but the easiest way is to `cd` to your app directory, then do this:

    curl -O http://github.com/johnflesch/reload.js/raw/master/reload.js

`reload.js` will be saved to your app directory.

Also, you'll need the unix [find](http://unixhelp.ed.ac.uk/CGI/man-cgi?find) and [grep](http://unixhelp.ed.ac.uk/CGI/man-cgi?grep) commands. But you should probably already be okay with that.

## Usage

`reload.js` simply wraps your application. Where you'd normally do this:

    node app.js

Do this instead:

    node reload.js app.js

You can also pass extra arguments to `app.js`:

    node reload.js app.js localhost 3000

Output from your application is `echo`'d as normal - both `STDOUT` and `STDERR`. When an error does happen, `reload.js` simply waits for you to fix it.

Output from `reload.js` is prefixed with `[reload.js]`.

Though it won't be of much help, you can do this:

    node reload.js --help

## Limitations

Admittedly, this isn't very robust. But I don't need it to be.

  - `reload.js` only watches the current directory, so you can't run it from `bin` or anything like that.
  - You can't ignore files. `find . | grep .js$` will be greedy and grab *all* `*.js` files in your application.
  - `fs.watchFile` is configured to check for updates every 1s. That's probably too much (unless you type fast).
  - I have no idea if this will work on Windows.

## Todo

  - Add [CoffeeScript](http://jashkenas.github.com/coffee-script/) support.
  - Add the ability to ignore files.
  - Add it to `bin`.
