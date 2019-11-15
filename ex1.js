#!/usr/bin/env node

//The shebang tells shell what environtment to run.
//change to executable chmod u+x [filename]
//alternative to npm minimist is npm yargs it auto generates help output

'use strict';
const util = require('util');
const path = require('path');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2), {
	boolean: ['help'],
	string: ['file'],
});
const getStdin = require('get-stdin');

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (process.env.HELLO) {
	console.log(process.env.HELLO);
}

if (args.help) {
	printHelp();
} else if (args.in || args._.includes('-')) {
	getStdin()
		.then(processFile)
		.catch(printError);
} else if (args.file) {
	fs.readFile(path.join(BASE_PATH, args.file), function onContents(err, contents) {
		if (err) {
			printError(err.toString());
		} else {
			processFile(contents.toString());
		}
	});
	processFile(path.resolve(args.file));
} else {
	printError('Incorrect usage', true);
}

///*************************** Helpers ******************* ////
function printHelp() {
	console.log('ex1 usage:   ');
	console.log(' ex1.js --file=[FILENAME}');
	console.log('');
	console.log('--help                  		 			 print help files');
	console.log('--file={FILENAME}                 process the file');
	console.log('--in,  -        									 process stdin');
	console.log('');
}

function printError(msg, includeHelp = false) {
	console.error(msg);
	if (includeHelp) {
		console.log('');
		printHelp();
	}
}

function processFile(contents) {
	// Second param of readFileSync will comfort binary buffter to text, otherwise process.stdout.write will consume and translate the buffer from binnary.
	// let contents = fs.readFileSync(filepath, 'utf-8');

	//async read that always take a callback witht he first param error
	// fs.readFile(filepath, function onContents(err, contents) {
	// 	if (err) {
	// 		printError(err.toString());
	// 	} else {
	// 		// console.log(contents);
	// 		process.stdout.write(contents);
	// 	}
	// });

	//second iteration of this function
	contents = contents.toUpperCase();
	process.stdout.write(contents);
}
