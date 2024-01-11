/**
 * ProductImage.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    imageUrl: {
      type: "string",
      description: "Image Cloudinary Download Link",
    },
    publicId: {
      type: "string",
      description: "Cloudinary Image public Id",
    },
    product: {
      model: "product",
    },
  },
};
