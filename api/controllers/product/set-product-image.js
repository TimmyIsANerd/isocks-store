module.exports = {
  friendlyName: "Set product image",

  description: "Set Product Images",

  inputs: {
    productImages: {
      type: "json",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully set Product Image",
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;
    const { productId: id } = req.params;
    const { productImages } = inputs;

    if (!id) {
      return res.badRequest("No product id received from client side");
    }

    if (productImages.length === 0) {
      return res.badRequest("No product images set");
    }

    const productRecord = await Product.findOne({ id });

    if (!productRecord) {
      return res.notFound("Could not find product with that id");
    }

    for (let i = 0; i < productImages.length; i++) {
      const imageRecord = await Image.findOne({ id: productImages[i].id });

      if (!imageRecord) {
        return res.notFound("Could not Find that Image in the gallery");
      }
    }

    try {
      await Product.updateOne({ id }).set({ productImages });

      return exits.success({ message: "Successfully set product images" });
    } catch (error) {
      sails.log.error(error);
      return res.serverError({ message: "Failed to set product images" });
    }
  },
};
