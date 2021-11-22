const fs = require('fs'); // eslint-disable-line
const apolloFilePath = process.cwd() + '/src/generated/apollo.ts';

const apolloFile = fs.readFileSync(apolloFilePath, 'utf8');

// console.log('@@ a', apolloFile);

const lazyFunctions = apolloFile.match(/(function use\w*LazyQuery)/g);

const lazyQueries = lazyFunctions.map((lq) => lq.replace('function ', ''));

function extractFunctionName(str, useDelim = 'LazyQuery') {
  let funcName;
  funcName = str.replace('use', '');
  funcName = funcName.replace(useDelim, '');
  return funcName;
}

function createFunctionType(name, useDelim = 'LazyQuery') {
  return `${name}${useDelim}Function`;
}

function initializeFunctionType(funcType) {
  const funcTypeInit = `export type ${funcType} = typeof use${funcType.replace(
    'Function',
    ''
  )};`;
  return funcTypeInit;
}
// 1. create the use BLANK function types
// 2. create a union on all the variables of those types
// 3. That is the return variable type.
// 'export type

const funcNames = lazyQueries.map((lq) => extractFunctionName(lq));

const funcTypes = funcNames.map((fn) => createFunctionType(fn));

const funcInits = funcTypes.map((ft) => initializeFunctionType(ft));

const funcTypesUnion = funcTypes.reduce((acc, v) => {
  if (acc) {
    return acc + ' | ' + v;
  }
  return v;
}, '');

const initFuncUnion = `export type QueryFunctionsUnion = ${funcTypesUnion};`;

const writeStream = fs.createWriteStream(apolloFilePath, { flags: 'a' });

writeStream.write('\n\n');
funcInits.forEach((ft) => {
  writeStream.write(ft + '\n');
});

writeStream.write('\n');
writeStream.write(initFuncUnion + '\n');

writeStream.end();
