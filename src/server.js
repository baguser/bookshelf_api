/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server run at ${server.info.uri}`);
};

init();
