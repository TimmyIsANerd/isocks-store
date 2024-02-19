/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    owner: {
      model: "user",
    },
    status: {
      type: "string",
      isIn: ["pending", "processing", "shipped", "delivered"],
      description: "Order Status",
      defaultsTo: "pending",
    },
    paymentMethod: {
      type: "string",
      isIn: ["USDT - Tether", "US Dollar", "Nigerian Naira", "Defi Tiger"],
      description: "Payment Method",
    },
    paidStatus: {
      type: "string",
      isIn: ["paid", "unpaid"],
      defaultsTo: "unpaid",
    },
    products: {
      type: "json",
      description: "Array of Ordered Products",
      required: true,
    },
    billingInfo: {
      type: "json",
      description: "Billing Information",
    },
    totalPrice: {
      type: "number",
      description: "Total Price of Products",
      required: true,
    },
    orderInitialDate: {
      type: "string",
      description: "Initialized Order Date",
      required: true,
    },
    orderDeliveryDate: {
      type: "string",
      description: "Delivered Order Date",
      defaultsTo: "",
    },
    deliveryEstimate: {
      type: "string",
      description: "Order Delivery Date",
      example: "Delivery between 19 February and 23 February.",
    },
  },
};
