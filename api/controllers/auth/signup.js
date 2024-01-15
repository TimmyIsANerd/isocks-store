const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Signup",

  description: "Signup & Create New User.",

  inputs: {
    fullName: {
      type: "string",
      required: true,
    },
    emailAddress: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "Successfully created a new user",
    },
    emailAlreadyInUse: {
      statusCode: 409,
      responseType: "emailAlreadyInUse",
      description: "The provided email address / username is already in use.",
    },
    invalid: {
      responseType: "badRequest",
      statusCode: 400,
      description:
        "The provided fullName, password and/or email address are invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent.",
    },
  },

  fn: async function (inputs, exits) {
    const { fullName, emailAddress, password } = inputs;

    const { req, res } = this;

    if (password.length < 8) {
      return res.status(400).json({
        message: "Bad Request",
        error: "Password is less than 8 characters",
      });
    }

    const emailProofToken = await sails.helpers.strings.random("url-friendly");

    const newUser = await User.create({
      fullName,
      emailAddress,
      password,
      emailProofToken,
      emailProofTokenExpiresAt:
        Date.now() + sails.config.custom.emailProofTokenTTL,
      emailVerificationStatus: sails.config.custom.verifyEmail ? false : true,
      tos: req.ip,
    })
      .intercept("E_UNIQUE", "emailAlreadyInUse")
      .intercept({ name: "UsageError" }, "invalid")
      .fetch();

    if (sails.config.custom.verifyEmail) {
      const cleanEmail = emailAddress.toLowerCase().trim();
      const baseURL = sails.config.custom.clientBaseURL;
      const verificationLink = `${baseURL}/store/verify/email/${emailProofToken}`;

      const emailBody = await sails.renderView(
        "emails/user/email_verification",
        {
          layout: false,
          verificationLink,
        }
      );

      try {
        const result = await sails.helpers.sendEmail.with({
          to: cleanEmail,
          subject: "Welcome to iSocks! Just one more step...",
          html: emailBody,
        });

        sails.log.info("Successfully delivered verification email address");
      } catch (error) {
        sails.log.error(error);
      }
    }

    if (!newUser) {
      return res.recordCreationFailed("Failed to Create New User");
    }

    const user = _.omit(newUser, ["password", "createdAt", "updatedAt"]);

    return exits.success({
      user,
      token: jwt.sign({ user: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  },
};
