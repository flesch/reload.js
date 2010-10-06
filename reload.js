var fs = require('fs'),
	sys = require('sys'),
	path = require('path'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	prog = process.argv.shift(),
	self = path.basename(process.argv.shift()),
	args = args = process.argv,
	child;

(function(){

	if (!args.length || args[0] === '--help') {
		sys.print('\n    '+self+' expects at least one argument. Try running '+self+' like this:');
		sys.print('\n    > node '+self+' [app.js]\n');
		sys.print('\n    (You may want to check out http://github.com/johnflesch/reload.js/blob/master/README.md)\n\n')
		return;
	}

	// Cache this anonymous function so we can call it recursively.
	var callee = arguments.callee;

	// If the node instance already exists, kill it so we can restart.
	if (child && child.pid) {
		child.kill();
	}
		
	// Spawn a new instance of 'node'.
	child = spawn(prog, args);
	
	// Display STDOUT, STDERR and EXIT.
	child.stdout.on('data', function(data){ sys.print(data); });
	child.stderr.on('data', function(data){ sys.print(data); });
	child.on('exit', function(code, signal){
		sys.debug('['+self+'] Child process exited with code (' + code+'), and signal ('+signal+')');
	});
	
	// Watch all the "js" files in our application for changes.
	exec('find . | grep .js$', function(error, stdout, stderr){
		stdout.trim().split('\n').forEach(function(file){
			fs.unwatchFile(file);
			fs.watchFile(file, {interval:1000}, function(curr, prev){
				if (curr.mtime.valueOf() > prev.mtime.valueOf()) {
					sys.debug('['+self+'] ' + file + ' has changed. Restarting!');
					callee.call();
				}
			});
		});
	});

})();