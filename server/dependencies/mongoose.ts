import mongoose from "mongoose";
import getConfig from "../config";

const config = getConfig();

mongoose.connect(config.server.services.mongoose.mongodb_url, {}, (err) => {
  if (err) {
    throw err;
  }

  console.log("MongoDB connected!");
});
