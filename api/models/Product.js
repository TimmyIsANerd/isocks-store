/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    owner: {
      model: "admin",
    },
    productTitle: {
      type: "string",
      description: "Product Title",
    },
    productTag: {
      type: "string",
      description: "Product Tag",
    },
    productDescription: {
      type: "string",
      description: "Product Description",
    },
    price: {
      type: "json",
      description: "Product price in different currencies",
    },
    productimages: {
      collection: "productimage",
      via: "product",
    },
    size: {
      type: "json",
      description:"Size of Socks Available"
      // isIn: ["X", "XL", "XXL"],
    },
    availableQuantity: {
      type: "number",
      description: "Available Quantity in Stock",
    },
  },
};
