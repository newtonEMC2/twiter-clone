import { devConfig } from "./dev";

const NODE_ENV = process.env.NODE_ENV;
let config = {};
if (NODE_ENV === "development") {
  config = devConfig;
}

const { SERVER_URI } = config;

export { SERVER_URI };
