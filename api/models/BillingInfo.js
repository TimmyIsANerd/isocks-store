/**
 * BillingInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    owner: {
      model: "user",
      unique: true,
    },
    address: {
      type: "string",
      description: "User's Billing Address",
      required: true,
    },
    city: {
      type: "string",
      description: "User's City",
      required: true,
    },
    state: {
      type: "string",
      description: "User'State",
    },
    postalCode: {
      type: "string",
      required: true,
    },
    country: {
      type: "string",
      required: true,
    },
  },
};
