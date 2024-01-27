module.exports = {
  friendlyName: "Get image",

  description: "",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Image Successfully retrieved",
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;
    const { imageId: id } = req.params;

    if (!id) {
      return res.badRequest();
    }

    const imageRecord = await Image.findOne({ id });

    if (!imageRecord) {
      return res.notFound(`Could not find image with id:${id}`);
    }

    return res.status(200).json(imageRecord);
  },
};
