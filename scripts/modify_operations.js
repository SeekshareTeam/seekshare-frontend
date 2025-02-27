const fs = require('fs'); // eslint-disable-line

const operationsFilePath = process.cwd() + '/src/generated/operations.ts';

const operationsFile = fs.readFileSync(operationsFilePath, 'utf8');

const variableTypes = operationsFile.match(/(type \w+QueryVariables)/g);

const variableNames = variableTypes.map((vt) => vt.replace('type ', ''));

const varNameUnion = variableNames.reduce((acc, vn) => {
  return acc + ' | ' + vn;
}, 'undefined');

const initVarUnion = `export type QueryVariablesUnion = ${varNameUnion};`

const writeStream = fs.createWriteStream(operationsFilePath, { flags: 'a' });

writeStream.write('\n\n');

writeStream.write(initVarUnion + '\n');

writeStream.end();

