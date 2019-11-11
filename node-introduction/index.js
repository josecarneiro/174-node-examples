// Transversing through directories
// const sumUtility = require('./sum.js');
// const utilities = require('./utilities.js');
// const sumUtility = require('./../sum');
// const sumUtility = require('./../sum');

const sumUtility = require('./sum');
const utilities = require('./utilities');

// These would have the same effect
// const services = require('./services/index.js');
const services = require('./services');

console.log(sumUtility(10, 25));
console.log(utilities.multiply(10, 25));
console.log(services());

// console.log(global);

const chalk = require('chalk');

console.log(chalk.cyan('Hello World'));
console.log(chalk.green('Hello World'));
console.log(chalk.red('Hello World'));
console.log(chalk.bgYellow('Hello World'));
