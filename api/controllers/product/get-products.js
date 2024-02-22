module.exports = {
  friendlyName: "Get products",

  description: "",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully retrieved Products",
    },
  },

  fn: async function (inputs, exits) {
    const productRecord = await Product.find({});

    return exits.success(productRecord);
  },
};
