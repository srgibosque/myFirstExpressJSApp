const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Sets pug as the default template engine
app.set('view engine', 'pug');
// tells express in which folder the templates (pug files) are located
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//It parses the requests
app.use(bodyParser.urlencoded({ extended: false }));
//loads static files like css
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',  adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('page-not-found');
});

app.listen(3000);