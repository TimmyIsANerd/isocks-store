/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  // User Authentication
  "POST /api/v1/auth/signup": { action: "auth/signup" },
  "POST /api/v1/auth/login": { action: "auth/login" },
  // Password Change
  "POST /api/v1/profile/password": { action: "user/change-password" },
  // GET Profile
  "GET /api/v1/profile": { action: "user/get-profile" },
  "PATCH /api/v1/profile": { action: "user/update-profile" },

  // Admin Login
  "POST /api/v1/admin/auth/login": { action: "admin/auth/login" },
  // Get Admin Profile
  "GET /api/v1/admin/profile": { action: "admin/profile/get-user" },

  // Email Verification
  "GET /api/v1/verification/email/:emailProofToken": {
    action: "user/verify-email",
  },
  // Resend Verification Email
  "GET /api/v1/verification/email/resend": {
    action: "user/resend-verify-email",
  },

  // Image Gallery
  // Upload Image
  "POST /api/v1/gallery/image": { action: "admin/upload-image" },
  // GET Images
  "GET /api/v1/gallery": { action: "admin/gallery/get-images" },
  // GET Image
  "GET /api/v1/gallery/:imageId": { action: "admin/gallery/get-image" },

  "PATCH /api/v1/gallery/image/:galleryId/:imageId": {
    action: "admin/edit-image-prop",
  },

  // Products
  "POST /api/v1/product": { action: "product/add-product" },
  // Upload Product Image
  "PATCH /api/v1/product/:productId": {
    action: "product/upload-product-image",
  },
  "PATCH /api/v1/product/:productId": { action: "product/update-product" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
