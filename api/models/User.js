// api/models/User.js

module.exports = {
  attributes: {
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
    emailVerificationStatus: {
      type: "boolean",
      defaultsTo: false,
      description: "Email Verification Status",
    },
    emailProofToken: {
      type: "string",
      description: "Email Verification Token",
    },
    emailProofTokenExpiresAt: {
      type: "number",
      description: "Email Verification Token Time To Live",
    },
    billingInfo: {
      collection: "billinginfo",
      via: "owner",
    },
    orders: {
      collection: "order",
      via: "owner",
    },
    tos: {
      type: "string",
      description: "IP Address that accepts Terms ",
    },
  },

  // Lifecycle Callbacks
  beforeCreate: async (values, proceed) => {
    // Hash the password before creating the user
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.password
    );
    values.password = hashedPassword;
    return proceed();
  },
};
