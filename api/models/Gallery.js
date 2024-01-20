/**
 * Gallery.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    owner: {
      model: "admin",
      unique: true,
    },
    images: {
      collection: "image",
      via: "gallery",
    },
  },
};
