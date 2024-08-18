const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  // Thanks to the callback we can wait for the array to be fetched. Avoiding to be undefined. 
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    return callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if(this.id){
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }

    });
  }

  static deleteById(id){
    getProductsFromFile((products) => {
      const newProductsArray = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(newProductsArray), err => {
        if (!err) {
          // remove product from the cart
        }
      });
    });
  }

  //Not callable from an instance
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
}