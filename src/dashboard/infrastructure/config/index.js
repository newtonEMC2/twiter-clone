import { devConfig } from "./dev";

const NODE_ENV = process.env.NODE_ENV;
let config = {};
if (NODE_ENV === "development") {
  config = devConfig;
}

const { COMMENTS_SERVER_URI, USERS_SERVER_URI } = config;

export { COMMENTS_SERVER_URI, USERS_SERVER_URI };
