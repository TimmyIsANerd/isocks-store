module.exports = {
  friendlyName: "Delete address",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const { id } = req.params;

    const billing = await BillingInfo.findOne({ id });

    if (!billing) {
      return res.notFound(`Billing Info with ${id} not found`);
    }

    try {
      await BillingInfo.destroyOne({ id });

      return res
        .status(200)
        .json({ message: "Successfully deleted billing information" });
    } catch (error) {
      sails.log.error(error);

      return res.serverError({
        message: "Failed to delete billing information",
      });
    }
  },
};
