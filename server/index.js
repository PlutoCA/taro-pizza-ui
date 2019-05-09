"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "0.0.0.0",
    routes: {
      files: {
        relativeTo: path.resolve(__dirname, "../doc/build")
      }
    }
  });

  await server.register(Inert);

  server.route([
    {
      method: "GET",
      path: "/{param*}",
      handler: {
        directory: {
          path: ".",
          index: true
        }
      }
    },
    {
      method: "GET",
      path: "/",
      handler: {
        file: "index.html"
      }
    }
  ]);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
