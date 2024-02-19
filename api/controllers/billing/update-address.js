module.exports = {
  friendlyName: "Update address",

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

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const { id } = req.params;

    const billingInfo = await BillingInfo.findOne({ id });

    if (!billingInfo) {
      return res.notFound("Billing Information not found...");
    }

    try {
      await BillingInfo.updateOne({ id }).set({ ...inputs });
    } catch (error) {
      sails.log.error(error);
      res.serverError({
        message: "Failed to Update User Billing Address",
      });
    }
  },
};
