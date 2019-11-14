const dotenv = require('dotenv');
dotenv.config();

// console.log(process);

// process.exit();

// process.env.NODE_ENV = 'development';

console.log(process.env);

const servicePassword = process.env.SERVICE_PASSWORD;
