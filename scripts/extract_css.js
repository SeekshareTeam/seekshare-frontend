const fs = require('fs'); // eslint-disable-line
const axios = require('axios') // eslint-disable-line
const gradientCssPath = process.cwd() + '/public/webgradients.css';

const gradientCss = fs.readFileSync(gradientCssPath, 'utf8');

const listOfGradients = gradientCss.match(/(?<=\.)([a-zA-Z\_])+\_([a-zA-Z])+/g); // eslint-disable-line

(async () => {
  await axios({
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    url: 'http://localhost:4000/image_array',
    data: {
      gradient: listOfGradients,
    },
  });
})()

// const lazyFunctions = apolloFile.match(/(function use\w*LazyQuery)/g);
//
// const lazyQueries = lazyFunctions.map((lq) => lq.replace('function ', ''));
//
// function extractFunctionName(str, useDelim = 'LazyQuery') {
//   let funcName;
//   funcName = str.replace('use', '');
//   funcName = funcName.replace(useDelim, '');
//   return funcName;
// }
