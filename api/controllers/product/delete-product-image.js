module.exports = {
  friendlyName: "Delete product image",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const { imageId: id } = req.params;

    if (!id) {
      return res.badRequest("No Product Image Id Provided");
    }

    // Find the Image and Delete it
    const imageRecord = await Image.findOne({ id });
    if (!imageRecord) {
      return res.notFound(`Could not find Product Image with id:${id}`);
    }

    // Find the Product Image using product Attribute
    const productImageRecord = await ProductImage.findOne({
      product: imageRecord.product,
    });

    if (!productImageRecord) {
      return res.notFound(`Could not find product image record`);
    }

    try {
      await Promise.all([
        await ProductImage.destroyOne({ id: productImageReocrd.id }),
        await Image.destroyOne({ id }),
      ]);
    } catch (error) {
      sails.log.error(error);
      return res.serverError({ message: "Failed to delete Messages" });
    }
  },
};
