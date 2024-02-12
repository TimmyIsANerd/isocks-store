module.exports = {
  friendlyName: "Get order",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const { orderId: id } = req.params;

    const order = await Order.findOne({ id });

    if (!order) {
      return res.notFound(`Failed to find order with id:${id}`);
    }

    return res.status(200).json(order);
  },
};
