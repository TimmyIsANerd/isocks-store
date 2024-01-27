module.exports = {
  friendlyName: "Get images",

  description: "Get All Images",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully retrieved image records",
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;
    const id = req.user;

    // Find Admin
    const adminRecord = await Admin.findOne({ id }).populate('gallery');
    // Find Gallery
    const images = await Image.find({
      gallery: adminRecord.gallery.id,
    });

    // Find All Images
    return exits.success(images);
  },
};
