module.exports = {
  friendlyName: "Delete product",

  description: "",

  inputs: {},

  exits: {},

  fn: async function () {
    const { req, res } = this;
    const { productId: id } = req.params;

    const product = await Product.findOne({ id });

    if (!product) {
      return res.notFound("Product not found");
    }

    const productImages = await ProductImage.find({ product: id });

    if (productImages > 0) {
      try {
        await ProductImages.destroy({ product: id });
      } catch (error) {
        sails.log.error(error);
        return res.serverError({
          message: "Failed to delete product images",
        });
      }
    }

    try {
      await Product.destroyOne({ id });

      return res.status(200).json({
        message: "Successfully deleted product",
      });
    } catch (error) {
      sails.log.error(error);
      return res.serverError({
        message: "Failed to delete Product",
      });
    }
  },
};
