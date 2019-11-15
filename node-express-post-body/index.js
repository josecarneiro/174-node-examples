const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.send('Welcome user!');
});

app.use('/post', postRouter);

app.listen(3000);
