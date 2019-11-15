const express = require('express');

const app = express();

// Route Handlers
app.get('/', (req, res, next) => {
  res.send('Hello world');
});

app.get('/post/:post_id', (req, res, next) => {
  console.log(req.params.post_id);
  res.send('Loaded post ' + req.params.post_id);
});

app.get('/posts', (req, res, next) => {
  console.log(req.query.limit);
  res.send(`Loaded ${req.query.limit} posts`);
});

app.get('/:username', (req, res, next) => {
  console.log(req.params.username);
  res.send('Loaded user ' + req.params.username);
});

app.listen(3000);

function solution(number) {
  // convert the number to a roman numeral
  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
}
