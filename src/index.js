const express = require("express");
const expressApp = require("./express-app");
const { PORT } = require("./config");

const Server = async () => {
  const app = express();

  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

Server();
