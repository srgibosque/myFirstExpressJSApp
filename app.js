const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//It parses the requests
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>');
});

//same as app.use() but only trigger for post requests.
app.post('/product', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

// The default response middleware
app.use('/', (req, res, next) => {
  //sends any response
  res.send('<h1>Hello from express</h1>');
});

app.listen(3000);