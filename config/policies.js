/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const isAdmin = require("../api/policies/isAdmin");
const isAuth = require("../api/policies/isAuth");

module.exports.policies = {
  "*": isAuth,
  "auth/signup": true,
  "auth/login": true,
  "product/add-product": isAdmin,
  "product/upload-product-image": isAdmin,
  "product/update-product": isAdmin,
};
