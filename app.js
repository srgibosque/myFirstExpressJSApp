const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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
// A user can have multiple products
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
// The next relation is optional. With one direction of the relation is enough (the one above)
Cart.belongsTo(User);

// MANY TO MANY RELATIONSHIP
// A Cart has multiple products
Cart.belongsToMany(Product, { through: CartItem });
// A single product can be in many different carts
Product.belongsToMany(Cart, { through: CartItem });

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
    if(!user){
      return user.createCart();
    }
    return
    // console.log(user);
  }).then((cart) => {
    app.listen(3000);
  })
  .catch(err => console.error(err));
