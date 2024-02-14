module.exports = {
  friendlyName: "Get profile",

  description: "",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully retrieved user profile",
    },
  },

  fn: async function (inputs, exits) {
    const { req } = this;
    const id = req.user;

    const userRecord = await User.findOne({ id }).populate("billingInfo");

    if (!userRecord) {
      return res.notFound("User Profile Not Found");
    }

    const user = _.omit(userRecord, [
      "password",
      "createdAt",
      "updatedAt",
      "lastLoggedInAt",
    ]);

    return exits.success(user);
  },
};
