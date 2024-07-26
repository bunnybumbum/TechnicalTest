const express = require('express');
const { fetchData } = require('services');
const { formatData } = require('utilities');

const app = express();

app.get('/', async (req, res) => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const formattedData = formatData(data);
    res.json(formattedData);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});