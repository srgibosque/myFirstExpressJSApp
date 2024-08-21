const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

// Sets ejs as the default template engine
app.set('view engine', 'ejs');
// tells express in which folder the templates are located
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//It parses the requests
app.use(bodyParser.urlencoded({ extended: false }));
//loads static files like css
app.use(express.static(path.join(__dirname, 'public')));

//Middleware to pass a user to every incoming request
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      //We assing a new property to the req object
      req.user = user;
      // Goes to the next request
      next();
    })
    .catch(err => console.error(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Relation of models
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

//Creates tables from the sequelize models in the db
sequelize.sync()
  .then((result) => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Test', email: 'test@test.com' })
    }
    return user
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch(err => console.error(err));
