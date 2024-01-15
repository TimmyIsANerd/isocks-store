module.exports = {
  friendlyName: "Resend verify email",

  description: "",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully resent verification email address",
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;
    const id = req.user;

    const userRecord = await User.findOne({ id });

    const emailProofToken = await sails.helpers.strings.random("url-friendly");

    try {
      await User.updateOne({ id }).set({
        emailProofToken,
        emailProofTokenExpiresAt:
          Date.now() + sails.config.custom.emailProofTokenTTL,
      });
      const { emailAddress } = userRecord;

      const baseURL = sails.config.custom.clientBaseURL;
      const verificationLink = `${baseURL}/store/verify/email/${emailProofToken}`;

      const emailBody = await sails.renderView(
        "emails/user/email_verification_resend",
        {
          layout: false,
          verificationLink,
        }
      );

      try {
        const result = await sails.helpers.sendEmail.with({
          to: emailAddress,
          subject: "iSocks New Email Verification",
          html: emailBody,
        });

        sails.log.info("Successfully delivered verification email address");
      } catch (error) {
        sails.log.error(error);
      }
    } catch (error) {
      sails.log.error(error);
      return res.serverError({
        message: "Failed to update emailProofToken",
      });
    }

    return exits.success({
      message: "Successfully resent verification email",
    });
  },
};
