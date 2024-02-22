module.exports = {
  friendlyName: "Get product",

  description: "Get Product by Id",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully found product",
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;

    const { productId: id } = req.params;

    const product = await Product.findOne({ id });

    if (!product) {
      return res.notFound(`Product with id:${id} not found`);
    }

    return exits.success(product);
  },
};
