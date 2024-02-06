module.exports = {
  friendlyName: "Update product",

  description: "Update Created Product",

  inputs: {
    productTitle: {
      type: "string",
      description: "Product Title",
      required: true,
    },
    productTag: {
      type: "string",
      description: "Product Tag",
      required: true,
    },
    productDescription: {
      type: "string",
      description: "Product Description",
      required: true,
    },
    price: {
      type: "number",
      description: "Product price in dollar",
      required: true,
    },
    sizes: {
      type: "json",
      description: "Size of Socks Available",
      // isIn: ["X", "XL", "XXL"],
    },
    availableQuantity: {
      type: "number",
      description: "Available Quantity in Stock",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully updated requesting user's product",
    },
    failed: {
      statusCode: 409,
      description: "Failed to update requesting user's product",
    },
  },

  fn: async function (inputs, exits) {
    const {
      productTitle,
      productTag,
      productDescription,
      price,
      sizes,
      availableQuantity,
    } = inputs;
    const { req } = this;
    const { productId: id } = req.params;

    const productRecord = await Product.findOne({ id });

    if (!productRecord) {
      return res.notFound(`Could not find product with ${id}`);
    }

    try {
      await Product.updateOne({ id }).set({
        productTitle,
        productTag,
        productDescription,
        price,
        sizes,
        availableQuantity,
      });
    } catch (error) {
      sails.log.error(error);

      return exits.failed({ message: "Failed to update user's product" });
    }

    return exits.success({ message: "Successfully updated user product" });
  },
};
