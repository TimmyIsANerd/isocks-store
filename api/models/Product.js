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
    productTags: {
      type: "json",
      description: "Product Tags",
      defaultsTo: [],
    },
    productDescription: {
      type: "string",
      description: "Product Description",
    },
    price: {
      type: "number",
      description: "Product price in dollar",
      defaultsTo: 0,
    },
    productImages: {
      type: "json",
      description: "Array of Product Images",
      defaultsTo:[]
    },
    sizes: {
      type: "json",
      description: "Size of Socks Available",
      // isIn: ["X", "XL", "XXL"],
      defaultsTo: [],
    },
    availableQuantity: {
      type: "number",
      description: "Available Quantity in Stock",
    },
  },
};
