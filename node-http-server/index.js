const http = require('http');

const server = http.createServer((request, response) => {
  // ... Do something with request and response
  response.setHeader('Content-Type', 'text/html');
  switch (request.url) {
    case '/jose':
      response.write('José is the LT');
      break;
    case '/carla':
      response.write('Carla is the TA');
      break;
    case '/guilherme':
      response.write('Guilherme is the TA');
      break;
    case '/goncalo':
      response.write('Gonçalo is the PM');
      break;
    case '/paula':
      response.write('Paula is the TA!');
      break;
    default:
      response.statusCode = 404;
      response.write("We could not find the staff member you're looking for.");
      break;
  }
  response.end();
});

server.listen(3000);
