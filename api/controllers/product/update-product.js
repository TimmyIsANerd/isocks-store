module.exports = {
  friendlyName: "Update product",

  description: "Update Created Product",

  inputs: {
    productTitle: {
      type: "string",
      description: "Product Title",
      required: true,
    },
    productTags: {
      type: "json",
      description: "Product Tag",
    },
    productDescription: {
      type: "string",
      description: "Product Description",
      required: true,
    },
    price: {
      type: "number",
      description: "Product price in dollar",
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
      productTags,
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
      const updatedProduct = await Product.updateOne({ id })
        .set({
          productTitle,
          productTags,
          productDescription,
          price,
          sizes,
          availableQuantity,
        })
        .fetch();

      return exits.success({
        message: "Successfully updated user product",
        ...updatedProduct,
      });
    } catch (error) {
      sails.log.error(error);

      return exits.failed({ message: "Failed to update user's product" });
    }
  },
};
