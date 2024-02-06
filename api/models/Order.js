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
      isIn: ["USDT", "USD", "NGN", "DTG"],
      description: "Payment Method",
    },
    products: {
      type: "json",
      description: "Array of Ordered Products",
      required: true,
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
    },
  },
};
