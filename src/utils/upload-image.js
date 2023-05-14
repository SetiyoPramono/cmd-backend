const { cloudinary, uploadImageOptions } = require("../config/cloudinary");

module.exports.UploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, uploadImageOptions, (error, result) => {
      if (result && result.secure_url) {
        return resolve({ imageId: result.public_id, imageUrl: result.url });
      }
      return reject({ message: error.message });
    });
  });
};

module.exports.GetImage = (imageId) => {
  return new Promise((resolve, reject) => {
    cloudinary.api.resource(imageId, (error, result) => {
      if (result) {
        return resolve(result);
      }
      return reject({ message: error.message });
    });
  });
};

module.exports.DeleteImage = (imageId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      imageId,
      uploadImageOptions,
      (error, result) => {
        if (result) {
          return resolve(result);
        }
        return reject({ message: error.message });
      }
    );
  });
};
