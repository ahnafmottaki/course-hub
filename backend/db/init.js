import client from "./client.js";
import setUpCollections from "../schemaValidators/setUpCollections.js";

const mongoConnect = async (cb) => {
  try {
    await client.connect();
    await setUpCollections();
    cb();
  } catch (err) {
    console.log("Mongodb connection error", err);
    process.exit(1);
  }
};
export default mongoConnect;
