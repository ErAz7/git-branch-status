const yargs = require('yargs');
const commandLine = require('child_process');
const colors = require('colors');

const args = yargs.argv;

const mapKeyToStr = {
	lastCommitDate: 'Last Commit Date',
	commitCount: 'Commit Count',
	branchName: 'Name',
	authorName: 'Author'
};

const mapSortToKey = {
	date: 'lastCommitDate',
	count: 'commitCount'
};

const branchStatus = async () => {
	const {stdout: branchesStr, stderr } = await execShellCommand('git branch');

	if (stderr){
		console.log(stderr.red);

		return;
	}

	const branchesNames = branchesStr.split('\n');

	const fixedBranchNames = [];

	branchesNames.forEach(branch => {
		const match = branch.match(/[^ ]+$/g);

		match && fixedBranchNames.push(match[0]);
	});

	const branchInfos = [];

	for(let i = 0; i< fixedBranchNames.length; i++){
		const branch = fixedBranchNames[i];
		const lastCommitDate = await execShellCommand(
			`git log -1 --format=%cd ${branch}`
		);

		const commitCount = await execShellCommand(
			`git rev-list --count ${branch}`
		);

		const authorName = await execShellCommand(
			`git log -1 --format=%an ${branch}`
		);

		branchInfos.push({
			[mapKeyToStr.branchName]: branch,
			[mapKeyToStr.authorName]: validateProp(authorName),
			[mapKeyToStr.lastCommitDate]: validateProp(lastCommitDate),
			[mapKeyToStr.commitCount]: validateProp(commitCount, parseInt)
		});
	}

	const branchInfosSorted = branchInfos.sort(handleSort(args.sortBy, args.sortType));

	console.table(branchInfosSorted);
};

const validateProp = ({stdout, stderr}, apply = a => a) => stderr ? (
	'Err'
) : (
	apply(stdout.replace('\n', ''))
);

const handleSort = (by = 'date', type) => (a,b) => {
	const prop = mapKeyToStr[mapSortToKey[by]];
	const aProp = a[prop];
	const bProp = b[prop];

	const typeBool = type === 'asc' ? 1 : -1;

	switch(by) {
	case 'date':
		return typeBool * (new Date(aProp) >= new Date(bProp) ? 1 : -1);
	case 'count':
		return typeBool * (aProp >= bProp  ? 1 : -1);
	default:
		return 1;
	}
};

const  execShellCommand = cmd => {
	const exec = commandLine.exec;

	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(error.yellow);
			}

			resolve({
				stdout,
				stderr
			});
		});
	});
};



exports.branchStatus = branchStatus;
