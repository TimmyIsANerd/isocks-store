const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Login",

  description: "Login auth.",

  inputs: {
    emailAddress: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
      description:
        'The unencrypted password to try in this attempt, e.g. "passwordlol".',
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "The requesting user agent has been successfully logged in.",
    },
    badCombo: {
      description: `The provided email and password combination does not
        match any user in the database.`,
      responseType: "invalidCredentials",
    },
  },

  fn: async function (inputs, exits) {
    const { emailAddress, password } = inputs;

    const userRecord = await User.findOne({
      emailAddress: emailAddress.toLowerCase(),
    });

    if (!userRecord) {
      throw "badCombo";
    }

    await sails.helpers.passwords
      .checkPassword(password, userRecord.password)
      .intercept("incorrect", "badCombo");

    // Update user last login date
    await User.updateOne({ id: userRecord.id }).set({
      lastLoggedInAt: Date.now(),
    });

    return exits.success({
      message: "User Logged in Successfully",
      token: jwt.sign({ user: userRecord.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  },
};
