module.exports = {
  friendlyName: "Update profile",

  description: "",

  inputs: {
    emailAddress: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    fullName: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully updated profile",
    },
    failed: {
      statusCode: 409,
      description: "Failed to update requesting user's profile",
    },
  },

  fn: async function (inputs, exits) {
    const { fullName, emailAddress } = inputs;
    const { req } = this;
    const id = req.user;

    try {
      await User.updateOne({ id }).set({
        emailAddress,
        fullName,
      });
    } catch (error) {
      sails.log.error(error);
    }

    // All done.
    return exits.success({
      message:'Successfully updated profile'
    });
  },
};
