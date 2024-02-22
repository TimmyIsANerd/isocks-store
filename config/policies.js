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
  "product/set-product-image": isAdmin,
  "product/get-product": true,
  "product/get-products": true,
  "product/delete-product": isAdmin,
  "user/verify-email": true,
  "admin/upload-image": isAdmin,
  "admin/edit-image-prop": isAdmin,
  "admin/auth/login": true,
  "admin/profile/get-user": isAdmin,
  "admin/gallery/get-images": isAdmin,
  "admin/gallery/get-image": isAdmin,
  "admin/profile/get-stats": isAdmin,
};
