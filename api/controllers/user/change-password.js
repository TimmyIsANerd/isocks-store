module.exports = {
  friendlyName: "Change password",

  description: "",

  inputs: {
    currentPassword: {
      type: "string",
      description: "User's Current Unencrypted Password",
      required: true,
    },
    newPassword: {
      type: "string",
      description: "User's New Password",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description:
        "The requesting user's password has been successfully changed",
    },
    badCombo: {
      description: `The provided email and password combination does not
        match any user in the database.`,
      responseType: "invalidCredentials",
    },
    failed: {
      statusCode: 409,
      description: "Failed to update requesting user's password",
    },
  },

  fn: async function (inputs, exits) {
    const { currentPassword, newPassword } = inputs;
    const { req } = this;
    const id = req.user;

    const userRecord = await User.findOne({ id });

    await sails.helpers.passwords
      .checkPassword(currentPassword, userRecord.password)
      .intercept("incorrect", "badCombo");

    try {
      await User.updateOne({ id }).set({
        password: await sails.helpers.passwords.hashPassword(newPassword),
      });
    } catch (error) {
      sails.log.error(error);
      return exits.failed();
    }

    return exits.success();
  },
};
