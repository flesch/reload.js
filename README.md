# reload.js

`reload.js` will restart your **node** application when a change is made. It should make developing a little quicker.

## Usage

`reload.js` simply wraps your application. Where you'd do this:

    node app.js

Do this instead:

    node reload.js app.js

You can also pass extra arguments to `app.js`:

    node reload.js app.js localhost 3000

Output from your application is echoed as normal. If `app.js` throws an error, you'll see it echoed and `reload.js` simply waits for another change.

## See Also

Admittedly, this isn't very robust. Here are some other resources for "hot loading" `node`.

  - [remy/nodemon](http://github.com/remy/nodemon)
  - [weepy/bounce](http://github.com/weepy/bounce)
  - [ripter/node.runner](http://github.com/ripter/node.runner)
  - ["Auto-reload of files in Node.js" on
    StackOverflow](http://stackoverflow.com/questions/1972242/auto-reload-of-files-in-node-js)

♥ @[johnflesch](http://twitter.com/johnflesch)