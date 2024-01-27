module.exports = {
  friendlyName: "Edit image prop",

  description: "",

  inputs: {
    title: {
      type: "string",
      description: "Image Title",
    },
    description: {
      type: "string",
      description: "Image Description",
    },
    alt: {
      type: "string",
      description: "Image Alt for accessibilityF",
    },
    tags: {
      type: "json",
      description: "Tags to Search and find Image",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully edited image properties",
    },
  },

  fn: async function (inputs, exits) {
    const { title, description, alt, tags } = inputs;
    const { req, res } = this;
    const { galleryId: gallery, imageId: id } = req.params;

    if (!galleryId || !imageId) {
      return res.badRequest();
    }

    const imageRecord = await Image.findOne({
      gallery,
      id,
    });

    if (!imageRecord) {
      return res.notFound();
    }

    try {
      await Image.updateOne({ id }).set({
        title,
        description,
        alt,
        tags,
      });

      return exits.success({
        message: "Successfully edited Image Properties",
      });
    } catch (error) {
      sails.log.error(error);
      return res.serverError({ message: "Failed to update Image Properties" });
    }
  },
};
