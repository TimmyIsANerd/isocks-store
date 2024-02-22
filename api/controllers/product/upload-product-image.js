const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  friendlyName: "Upload product image",

  description: "",

  inputs: {
    tags: {
      type: "json",
      description: "Tags to Search and find Image",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully uploaded avatar",
    },
    noUploadedFile: {
      statusCode: 400,
      description: "No Uploaded File Received",
    },
    uploadFailed: {
      statusCode: 500,
      description: "Avatar Image Upload Failed",
    },
    maxUploads: {
      statusCode: 400,
      description: "Max Uploads Reach",
    },
  },

  fn: async function (inputs, exits) {
    const { req } = this;
    const { productId: id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Failed to provide product i",
      });
    }

    const admin = req.user;
    const adminRecord = await Admin.findOne({ id: admin });
    const galleryRecord = await Gallery.findOne({ owner: adminRecord.id });
    const productRecord = await Product.findOne({ id }).populate(
      "productimages"
    );

    if (!productRecord) {
      return res.notFound(`Could not find product with ${id}`);
    }

    if (productRecord.productimages && productRecord.productimages.length > 5) {
      return exits.maxUploads({
        message: "Maximum number of product images uploaded",
      });
    }

    if (!req.file("productImages")) {
      return exits.noUploadedFile({
        message: "No Uploaded File Received from client side",
      });
    }

    async function uploadImage(galleryId) {
      if (sails.config.custom.uploadToCloud) {
        req.file("productImages").upload(
          {
            maxBytes: sails.config.custom.maxBytes,
          },
          async function whenDone(error, uploadedFiles) {
            if (uploadedFiles.length === 0 || error) {
              return exits.noUploadedFile({
                message: "No Uploaded File(s) Received",
              });
            }

            try {
              const uploadPromises = uploadedFiles.map(async (file) => {
                const result = await cloudinary.uploader.upload(
                  uploadedFiles[0].fd,
                  {
                    folder: `${galleryId}/isocks-products`,
                  }
                );

                const newImage = await Image.create({
                  gallery: galleryId,
                  imageUrl: result.secure_url,
                  publicId: result.public_id,
                  title: file.fileName,
                  product: id,
                });

                const image = _.omit(newImage, ["id"]);

                await ProductImage.create({
                  ...image,
                  product: id,
                });
              });

              await Promise.all(uploadPromises);

              return exits.success({
                message: "Successfully uploaded images to cloud",
              });
            } catch (error) {
              sails.log.error(error);
              return res.serverError();
            }
          }
        );
      }

      const baseUrl = sails.config.custom.baseUrl;

      req.file("productImages").upload(
        {
          maxBytes: sails.config.custom.maxBytes,
          dirname: require("path").resolve(
            sails.config.appPath,
            `assets/images/gallery/${galleryId}`
          ),
        },
        async function whenDone(err, uploadedFiles) {
          if (err || uploadedFiles.length === 0) {
            sails.log.error(err);
            return res.serverError({ message: "Images Upload Failed" });
          }

          const uploadPromises = uploadedFiles.map(async (file) => {
            const imageFileName = file.fd.split("/").pop(); // Get the generated filename

            function extractRelativePath(fullPath) {
              const assetsPath = path.resolve(sails.config.appPath, "assets");
              const relativePath = path.relative(assetsPath, fullPath);
              return relativePath.replace(/\\/g, "/"); // Convert backslashes to forward slashes
            }

            try {
              const newImage = await Image.create({
                gallery: galleryId,
                title: file.filename,
                imageUrl: `${baseUrl}/${extractRelativePath(imageFileName)}`,
                publicId: imageFileName,
                alt: imageFileName,
                tags,
              });

              const image = _.omit(newImage, ["id"]);

              await ProductImage.create({
                ...image,
                product: id,
              });
            } catch (error) {
              sails.log.error(error);
              return res.serverError({
                message: "Image record creation failed",
              });
            }
          });

          await Promise.all(uploadPromises);

          return exits.success({
            message: "Successfully uploaded product images",
          });
        }
      );
    }

    if (!galleryRecord) {
      try {
        const newGallery = await Gallery.create({
          owner: adminRecord.id,
        }).fetch();

        await uploadImage(newGallery.id);
      } catch (error) {
        return res.serverError("Failed to Initialize Gallery");
      }
    }
  },
};
