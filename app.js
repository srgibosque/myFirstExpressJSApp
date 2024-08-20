const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();
const sequelize = require('./util/database');

// Sets ejs as the default template engine
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

//Creates tables from the sequelize models in the db
sequelize.sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch(err => console.error(err));
