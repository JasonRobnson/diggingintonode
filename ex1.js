#!/usr/bin/env node

//The shebang tells shell what environtment to run.
//change to executable chmod u+x [filename]
//alternative to npm minimist is npm yargs it auto generates help output

'use strict';
const args = require('minimist')(process.argv.slice(2), {
	boolean: ['help'],
	string: ['file'],
});

if (args.help) {
	printHelp();
} else if (args.file) {
	console.log(args.file);
} else {
	printError('Incorrect usage', true);
}

///*************************** Helpers ******************* ////
function printHelp() {
	console.log('ex1 usage:   ');
	console.log(' ex1.js --file=[FILENAME}');
	console.log('');
	console.log('--help                  print this help');
	console.log('--file={FILENAME}                 process the file');
	console.log('');
}

function printError(msg, includeHelp = false) {
	console.error(msg);
	if (includeHelp) {
		console.log('');
		printHelp();
	}
}
