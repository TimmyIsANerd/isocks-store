module.exports = {
  friendlyName: "Verify email",

  description: "Verify Email Address using emailProofToken",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
    },
    expiredToken: {
      statusCode: 409,
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;
    const { emailProofToken } = req.params;

    if (!emailProofToken) {
      return res.badRequest();
    }

    const userRecord = await User.findOne({ emailProofToken });

    if (!userRecord) {
      return res.notFound("Could not find user with that emailProofToken");
    }

    const currentTime = Date.now();
    // Confirm token TTL still active
    if (currentTime >= userRecord.emailProofTokenExpiresAt) {
      // Token Invalid
      return exits.expiredToken({
        message: "Token Expired",
      });
    }

    try {
      await User.updateOne({ id: userRecord.id }).set({
        emailVerificationStatus: true,
        emailProofToken: "",
        emailProofTokenExpiresAt: 0,
      });

      const baseURL = sails.config.custom.clientBaseURL;
      const storeUrl = `${baseURL}/store`;

      const emailBody = await sails.renderView(
        "emails/user/email_verification_success",
        {
          layout: false,
          storeUrl,
        }
      );

      const result = await sails.helpers.sendEmail.with({
        to: userRecord.emailAddress,
        subject: "Email Successfully Verified",
        html: emailBody,
      });

      sails.log.info("Successfully delivered email", result);
    } catch (error) {
      sails.log.error(error);

      return res.serverError({
        message: "Failed to verify user",
      });
    }

    return exits.success({
      message: "Successfully verified Email Address",
    });
  },
};
