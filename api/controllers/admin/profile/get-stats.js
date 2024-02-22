module.exports = {
  friendlyName: "Get stats",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { res } = this;

    const [pendingOrders, completedOrders, createdProducts, soldProducts] =
      await Promise.all([
        Order.find({ status: "pending" }),
        Order.find({ status: "delivered" }),
        Product.count(),
        Order.find({ paidStatus: "paid" }),
      ]);

    return res.status(200).json({
      pendingOrders: pendingOrders.length,
      completedOrders: completedOrders.length,
      createdProducts,
      soldProducts: soldProducts.length,
    });
  },
};
