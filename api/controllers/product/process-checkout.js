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
      isIn: ["USDT", "USD", "NGN", "DTG"],
      description: "Payment Method",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully process checkout",
    },
  },

  fn: async function (inputs, exits) {
    const { products } = inputs;
    const { req, res } = this;
    const id = req.user;

    const totalPrice = products.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      0
    );

    const orderInitialDate = new Date.now();

    try {
      const newOrder = await Order.create({
        owner: id,
        totalPrice,
        orderInitialDate,
        products,
        paymentMethod,
      });

      return exits.success({ ...newOrder });
    } catch (error) {
      return res.serverError({ message: "Failed to Create Order Record" });
    }
  },
};
