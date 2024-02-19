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
    },
    fullName: {
      type: "string",
      description: "Recepient Full Name",
      required: true,
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
      defaultsTo: "",
    },
    country: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "json",
      description: "User Phone Number",
    },
    isDefault: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};
