module.exports = {
  friendlyName: "Add product",

  description: "Add Product for purchase",

  inputs: {
    productTitle: {
      type: "string",
      description: "Product Title",
      required: true,
    },
    productTags: {
      type: "json",
      description: "Product Tags",
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
      statusCode: 201,
      description: "Successfully added new product",
    },
    failed: {
      statusCode: 409,
      description: "Failed to create new product",
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
    const id = req.user;

    const newProduct = await Product.create({
      productTitle,
      productTags,
      productDescription,
      price,
      sizes,
      owner: id,
      availableQuantity,
    }).fetch();

    if (!newProduct) {
      return exits.failed();
    }

    return exits.success({
      message: "Successfully added new product",
      ...newProduct,
    });
  },
};
