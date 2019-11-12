const express = require('express');

const app = express();

app.use(express.static('public'));

// Middleware
app.use((request, response, next) => {
  console.log('Hit middleware!');
  next();
});

// Route Handlers
app.get('/', (request, response, next) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (request, response, next) => {
  response.sendFile(__dirname + '/views/about.html');
});

// "Catch all" route handler
app.get('*', (request, response, next) => {
  response.status(404);
  response.sendFile(__dirname + '/views/error.html');
  // response.send("I can't find the page you're looking for.");
});

app.listen(3000);
