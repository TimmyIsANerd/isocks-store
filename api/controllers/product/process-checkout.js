const { addWeeks, format } = require("date-fns");

module.exports = {
  friendlyName: "Process checkout",

  description: "",

  inputs: {
    products: {
      type: "json",
      description: "Selected Products coming from Client side for processing",
      required: true,
    },
    paymentMethod: {
      type: "string",
      isIn: ["USDT - Tether", "US Dollar", "Nigerian Naira", "Defi Tiger"],
      description: "Payment Method",
      required: true,
    },
    billingInfo: {
      type: "json",
      description: "Billing Information",
      required: true,
    },
    totalPrice: {
      type: "number",
      description: "Total Price ",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully process checkout",
    },
  },

  fn: async function (inputs, exits) {
    const { products, paymentMethod, billingInfo, totalPrice } = inputs;
    const { req, res } = this;
    const id = req.user;

    if (products.length === 0) {
      return res.badRequest("Client side sent an empty cart");
    }

    for (let i = 0; i < products.length; i++) {
      const productRecord = await Product.findOne({ id: products[i].id });

      if (!productRecord) {
        return res.notFound(
          `Could not find product with that id ${products[i].id}`
        );
      }
    }

    const orderInitialDate = new Date().now();

    const oneWeekAfter = addWeeks(orderInitialDate, 1);
    const twoWeeksAfter = addWeeks(orderInitialDate, 2);

    function formatDate(date) {
      return format(date, "dd MMMM");
    }

    try {
      const newOrder = await Order.create({
        owner: id,
        totalPrice,
        orderInitialDate,
        products,
        paymentMethod,
        billingInfo,
        deliveryEstimate: `Between ${formatDate(oneWeekAfter)} & ${formatDate(
          twoWeeksAfter
        )}`,
      });

      return exits.success(newOrder);
    } catch (error) {
      sails.log.error(error);
      return res.serverError({ message: "Failed to Create Order Record" });
    }
  },
};
