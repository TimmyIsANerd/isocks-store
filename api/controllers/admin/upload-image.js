const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  friendlyName: "Upload image",

  description: "Upload Image to Admin Profile Gallery",

  inputs: {},

  exits: {
    success: {
      statusCode: 201,
      description: "Image Successfully uploaded",
    },
    conflict: {
      statusCode: 409,
      description: "Process Conflict",
    },
  },

  fn: async function (inputs, exits) {
    const { req, res } = this;

    const id = req.user;

    const adminRecord = await Admin.findOne({ id });
    const galleryRecord = await Gallery.findOne({ owner: adminRecord.id });

    async function uploadImage(galleryId) {
      if (sails.config.custom.uploadToCloud) {
        req.file("image").upload(
          {
            maxBytes: sails.config.custom.maxBytes,
          },
          async function whenDone(err, uploadedFile) {
            if (err || uploadedFile.length === 0) {
              sails.log.error(err);
              return res.serverError({
                message: "Image Upload Failed",
              });
            }

            try {
              const result = await cloudinary.uploader.upload(
                uploadedFile[0].fd,
                {
                  folder: `${galleryId}/gallery`,
                }
              );

              await Image.create({
                gallery: galleryId,
                title: uploadedFile[0].fileName,
                imageUrl: result.secure_url,
                publicId: result.public_id,
              });

              return exits.success({
                message: "Successfully uploaded image to cloud",
              });
            } catch (error) {
              sails.log.error(error);
              return res.serverError({
                message: "Upload to Cloudinary Failed",
              });
            }
          }
        );
      }

      const baseUrl = sails.config.custom.baseUrl;
      imageFileName = sails.helpers.strings.random();

      req.file("image").upload(
        {
          maxBytes: sails.config.custom.maxBytes,
          dirname: require("path").resolve(
            sails.config.appPath,
            `assets/images/gallery/${galleryId}`
          ),
          saveAs: `${imageFileName}.png`,
        },
        async function whenDone(err, uploadedFile) {
          if (err || uploadedFile.length === 0) {
            sails.log.error(err);
            return res.serverError({ message: "Image Upload Failed" });
          }

          sails.log.debug(uploadedFile);

          try {
            await Image.create({
              gallery: galleryId,
              title: uploadedFile[0].filename,
              imageUrl: `${baseUrl}/images/gallery/${galleryId}/${imageFileName}.png`,
              publicId: imageFileName,
            });

            return exits.success({ message: "Successfully uploaded image" });
          } catch (error) {
            sails.log.error(error);
            return res.serverError({
              message: "Image record creation failed",
            });
          }
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

    await uploadImage(galleryRecord.id);
  },
};
