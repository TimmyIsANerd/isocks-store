module.exports = {
  friendlyName: "Get address",

  description: "",

  inputs: {},

  exits: {},

  fn: async function () {
    const { req, res } = this;
    const { id } = req.params;

    const billing = await BillingInfo.findOne({ id });

    if (!billing) {
      return res.notFound(`Billing Information with ${id} not found`);
    }

    return res.status(200).json(billing);
  },
};
