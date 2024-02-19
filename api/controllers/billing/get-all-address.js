module.exports = {
  friendlyName: "Get all address",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const id = req.user;

    try {
      const billingInfo = await BillingInfo.find({ owner: id });

      return res.status(200).json(billingInfo);
    } catch (error) {
      sails.log.error(error);

      return res.serverError({
        message: "Failed to retrieve billing info data",
      });
    }
  },
};
