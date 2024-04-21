const { gitDescribeSync } = require('git-describe');
const { writeFileSync } = require('fs');

const gitInfo = gitDescribeSync();
const versionInfoJson = JSON.stringify(gitInfo, null, 2);

writeFileSync('./src/git-version.json', versionInfoJson);