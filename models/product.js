const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );

    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  //Not callable from an instance
  static fetchAll(callback) {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );

    // Thanks to the callback we can wait for the array to be fetched. Avoiding to be undefined. 
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return callback([]);
      }
      return callback(JSON.parse(fileContent));
    });
  }
}