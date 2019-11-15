#!/usr/bin/env node

//The shebang tells shell what environtment to run.
//change to executable chmod u+x [filename]
//alternative to npm minimist is npm yargs it auto generates help output

'use strict';
const util = require('util');
const path = require('path');
const fs = require('fs');
const Transform = require('stream').Transform;

const args = require('minimist')(process.argv.slice(2), {
	boolean: ['help'],
	string: ['file'],
});

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (process.env.HELLO) {
	console.log(process.env.HELLO);
}

if (args.help) {
	printHelp();
} else if (args.in || args._.includes('-')) {
	processFile(process.stdin);
} else if (args.file) {
	let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
	processFile(stream);
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

function processFile(inStream) {
	let outStream = inStream;
	let upperStream = new Transform({
		transform(chunk, enc, cb) {
			this.push(chunk.toString().toUpperCase());
			cb();
		},
	});
	//Writing to UpperStream(writable stream) from instream (readable stream)
	outStream = outStream.pipe(upperStream);

	let targetStream = process.stdout;
	outStream.pipe(targetStream);
}
