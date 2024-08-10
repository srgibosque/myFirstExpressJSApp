const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

// Sets pug as the default template engine
// app.set('view engine', 'pug');
// Sets pug as the default template engine
app.set('view engine', 'ejs');
// tells express in which folder the templates (pug files) are located
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//It parses the requests
app.use(bodyParser.urlencoded({ extended: false }));
//loads static files like css
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);