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
  // Get Admin Dashboard Stats
  'GET /api/v1/admin/dashboard' : {action:"admin/profile/get-stats"},

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
  // Find All Products
  "GET /api/v1/product": { action: "product/get-products" },
  // Find One Product
  "GET /api/v1/product/:productId": { action: "product/get-product" },
  // Add Product
  "POST /api/v1/product": { action: "product/add-product" },
  // Set Product Image
  "PATCH /api/v1/product/image/:productId": {
    action: "product/set-product-image",
  },
  // Update Product
  "PATCH /api/v1/product/:productId": { action: "product/update-product" },
  // Delete Product
  "DELETE /api/v1/product/:productId": { action: "product/delete-product" },

  // Purchase Logic
  // Process Cart and Return Total
  "POST /api/v1/product/checkout": { action: "product/process-checkout" },

  // Orders
  "GET /api/v1/order": { action: "order/get-orders" },
  "GET /api/v1/order/:orderId": { action: "order/get-order" },
  // Update Order Status
  // Set to Processing
  "POST /api/v1/order": { action: "order/set-status" },

  // Billing Information
  "GET /api/v1/billing/address/:id": { action: "billing/get-address" },
  "GET /api/v1/billing/address": { action: "billing/get-all-address" },
  "DELETE /api/v1/billing/address/:id": { action: "billing/delete-address" },
  "POST /api/v1/billing/address": { action: "billing/set-address" },
  "PATCH /api/v1/billing/address/:id": { action: "billing/update-address" },
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
