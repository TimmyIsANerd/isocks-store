module.exports = {
  friendlyName: "Get orders",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const userId = req.user;

    try {
      const orders = await Order.find({ owner: userId });

      return res.status(200).json(orders);
    } catch (error) {
      sails.log.error(error);

      return res.serverError({ message: "Failed to Retrieve Orders" });
    }
  },
};
