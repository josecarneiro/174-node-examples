const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.search_query;
  const limit = req.query.limit;
  // Perform a search with the values above
  // and render them to results view
  res.sendFile(__dirname + '/views/search-results.html');
});

app.listen(3000);
