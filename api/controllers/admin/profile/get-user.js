module.exports = {
  friendlyName: "Get user",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const id = req.user;

    const adminRecord = await Admin.findOne({ id });

    if (!adminRecord) {
      return res.notFound("This Admin Account was not Found");
    }

    const user = _.omit(adminRecord, ["password", "createdAt", "updatedAt"]);

    return res.status(200).json(user);
  },
};
