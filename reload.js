var fs = require('fs'),
	sys = require('sys'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	prog = process.argv.shift(),
	self = process.argv.shift(),
	args = args = process.argv,
	child;

(function(){

	// Cache this anonymous function so we can call it recursively.
	var callee = arguments.callee;

	// If the node instance already exists, kill it
	// so we can restart.
	if (child && child.pid) {
		child.kill();
	}
		
	// Spawn a new instance of 'node'.
	child = spawn(prog, args);
	
	// Display STDOUT, STDERR and EXIT.
	child.stdout.on('data', function(data){ sys.print(data); });
	child.stderr.on('data', function(data){ sys.print(data); });
	child.on('exit', function(code, signal){
		sys.debug('[reload.js] Child process exited with code (' + code+'), and signal ('+signal+')');
	});

	// Watch all the "js" files in our application for changes.
	exec('find . | grep .js$', function(error, stdout, stderr){
		stdout.trim().split('\n').forEach(function(file){
			fs.unwatchFile(file);
			fs.watchFile(file, {interval:500}, function(curr, prev){
				if (curr.mtime.valueOf() > prev.mtime.valueOf()) {
					sys.debug('[reload.js] ' + file + ' has changed. Restarting!');
					callee.call();
				}
			});
		});
	});

})();