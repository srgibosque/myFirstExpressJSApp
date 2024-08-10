products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  //Not callable from an instance
  static fetchAll() {
    return products;
  }
}