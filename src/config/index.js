const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DATABASE_URL,
  APP_SECRET: process.env.APP_SECRET,
  CLOUDINARY_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.API_KEY,
  CLOUDINARY_API_SECRET: process.env.API_SECRET,
};
