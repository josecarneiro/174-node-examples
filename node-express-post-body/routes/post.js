const express = require('express');

const router = new express.Router();

router.post('/create', (req, res, next) => {
  res.send(
    `Blog post created with title "${req.body.title}", and body "${req.body.body}" by author ${req.body.author}.`
  );
});

router.get('/:postId', (req, res, next) => {
  res.send(`Here's the post with ID: ${req.params.postId}`);
});

router.patch('/:postId', (req, res, next) => {
  res.send(
    `Edited post with id ${req.params.postId} and body ${JSON.stringify(
      req.body
    )}`
  );
});

router.delete('/:postId', (req, res, next) => {
  res.send(`Deleted post with id ${req.params.postId}`);
});

module.exports = router;
