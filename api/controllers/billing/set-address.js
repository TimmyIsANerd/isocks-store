module.exports = {
  friendlyName: "Set Address",

  description: "",

  inputs: {
    fullName: {
      type: "string",
      description: "Recepient Full Name",
      required: true,
    },
    address: {
      type: "string",
      description: "User's Billing Address",
      required: true,
    },
    city: {
      type: "string",
      description: "User's City",
      required: true,
    },
    state: {
      type: "string",
      description: "User'State",
    },
    postalCode: {
      type: "string",
    },
    country: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "json",
      description: "User Phone Number",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully set address",
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;
    const id = req.user;

    try {
      const addressCount = await BillingInfo.count();
      await BillingInfo.create({
        ...inputs,
        owner: id,
        isDefault: addressCount > 0 ? false : true,
      });

      return exits.success({ message: "Successfully added new address" });
    } catch (error) {
      sails.log.error(error);

      return res.serverError({ message: "Failed to create new address" });
    }
  },
};
