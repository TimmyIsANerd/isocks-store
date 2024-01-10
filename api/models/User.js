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
    billingInfo: {
      collection: "billinginfo",
      via: "owner",
    },
    orders:{
      collection:'order',
      via:'owner'
    }
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
