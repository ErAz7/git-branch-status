const yargs = require('yargs');
const commandLine = require('child_process');
const colors = require('colors');

const args = yargs.argv;


const branchStatus = () => {
	console.log(args);

	commandLine.exec('git branch',(error, stdout, stderr) => {
		if (stderr){
			console.error(stderr);

			return;
		}

		console.log(__dirname, stdout);
	});
};


exports.branchStatus = branchStatus;
