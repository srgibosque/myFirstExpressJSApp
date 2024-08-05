const http = require('http');

const express = require('express');

const app = express();

// use() adds a new middleware function 
app.use((req, res, next) => {
  console.log('Middleware');
  //Thanks to next travels to the middleware below
  next();
});

app.use((req, res, next) => {
  console.log('In another middleware');
  //sends any response
  res.send('<h1>Hello</h1>');
});

const server = http.createServer(app);

server.listen(3000);