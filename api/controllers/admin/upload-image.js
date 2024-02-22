const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  friendlyName: "Upload images",

  description: "Upload Images to Admin Profile Gallery",

  inputs: {},

  exits: {
    success: {
      statusCode: 201,
      description: "Images Successfully uploaded",
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
        req.file("images").upload(
          {
            maxBytes: sails.config.custom.maxBytes,
          },
          async function whenDone(err, uploadedFiles) {
            if (err || uploadedFiles.length === 0) {
              sails.log.error(err);
              return res.serverError({
                message: "Images Upload Failed",
              });
            }

            try {
              const uploadPromises = uploadedFiles.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.fd, {
                  folder: `${galleryId}/gallery`,
                });

                await Image.create({
                  gallery: galleryId,
                  title: file.fileName,
                  imageUrl: result.secure_url,
                  publicId: result.public_id,
                });
              });

              await Promise.all(uploadPromises);

              return exits.success({
                message: "Successfully uploaded images to cloud",
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

      req.file("images").upload(
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
              await Image.create({
                gallery: galleryId,
                title: file.filename,
                imageUrl: `${baseUrl}/${extractRelativePath(imageFileName)}`,
                publicId: imageFileName,
              });
            } catch (error) {
              sails.log.error(error);
              return res.serverError({
                message: "Image record creation failed",
              });
            }
          });

          await Promise.all(uploadPromises);

          return exits.success({ message: "Successfully uploaded images" });
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
