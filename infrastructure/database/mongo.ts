import mongoose from "mongoose";
import { SystemService } from "../foundation/SystemService";

export class Mongodb implements SystemService {
  name: string = "Mongodb";

  constructor() {
    // state change log
    mongoose.connection.on("open", function () {
      console.log(`Mongodb open at ${new Date()}`);
    });
    mongoose.connection.on("connected", function () {
      console.log(`Mongodb connected at ${new Date()}`);
    });
    mongoose.connection.on("disconnected", function () {
      console.log(`Mongodb disconnected at ${new Date()}`);
    });
    mongoose.connection.on("connecting", function () {
      console.info(`Mongodb connecting at ${new Date()}`);
    });
    mongoose.connection.on("reconnected", function () {
      console.info(`Mongodb reconnected at ${new Date()}`);
    });
    mongoose.connection.on("error", function (e: Error) {
      console.error(`Mongodb error at ${new Date()}`, e);
    });
  }

  async start(): Promise<void> {
    const url = process.env.MONGODB_URL;
    if (!url) console.log("MONGODB_URL is not exits");

    let connectionLink;
    if (process.env.MONGODB_SRV_CONFIG) {
      const dbName = process.env.MONGODB_DBNAME;
      if (!dbName) console.log("MONGODB_DBNAME is not set");
      const user = process.env.MONGODB_USERNAME;
      if (!user) console.log("MONGODB_USERNAME is not set (optional)");
      const pass = process.env.MONGODB_PASSWORD;
      if (!pass) console.log("MONGODB_PASSWORD is not set (optional)");

      connectionLink = `mongodb+srv://${
        user && pass ? `${user}:${pass}@` : ""
      }${url}/${dbName}`;
    } else {
      connectionLink = url;
    }

    const options: mongoose.ConnectionOptions = {
      keepAlive: true,
      connectTimeoutMS: 30000,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      // w: "majority",
      j: true,
      wtimeout: 10000,
      authSource: "admin",
      poolSize: +process.env.MONGODB_POOL_SIZE || 20,
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    };

    await mongoose.connect(connectionLink, options);
  }

  async stop(): Promise<void> {
    await mongoose.disconnect();
  }
}
