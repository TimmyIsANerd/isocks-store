/**
 * Images.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    gallery: {
      model: "gallery",
    },
    product: {
      type: "string",
      description: "Product Id",
    },
    title: {
      type: "string",
      description: "Image Title",
    },
    description: {
      type: "string",
      description: "Image Description",
    },
    alt: {
      type: "string",
      description: "Image Alt for accessibility",
    },
    tags: {
      type: "json",
      description: "Tags to Search and find Image",
    },
    imageUrl: {
      type: "string",
      description: "Image Cloudinary Download Link",
    },
    publicId: {
      type: "string",
      description: "Cloudinary Image public Id",
    },
  },
};
