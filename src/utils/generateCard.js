const qrcode = require("qrcode");
const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");

const generateCard = (payload) => {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(
      payload,
      { color: { light: "#FED13A", dark: "#40340C" }, width: 90 },
      (err, url) => {
        if (err) throw err;

        mergeImages(
          [
            // { src: "./dumm-card.png", x: 0, y: 0 },
            { src: url, x: 0, y: 0 },
          ],
          { Canvas, Image }
        )
          .then((dataUri) => {
            // const decode = Buffer.from(dataUri.split(",")[1], "base64");
            // fs.writeFile("qr.png", decode, (err) => {
            //   if (err) throw err;
            //   console.log("File saved successfully!");
            // });
            resolve(dataUri);
          })
          .catch((error) => {
            reject("failed generate card");
          });
      }
    );
  });
};

module.exports = { generateCard };
