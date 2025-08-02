import attachValidatorToUserSchema from "./attachValidatorToUserSchema.js";
import attachValidatorToCourseSchema from "./attachValidatorToCourseSchema.js";
import db from "../db/db.js";
const setUpCollections = async () => {
  const collections = await db.listCollections().toArray();
  const existing = collections.map((collection) => collection.name);
  if (!existing.includes("users")) {
    attachValidatorToUserSchema();
  }
  if (!existing.includes("courses")) {
    attachValidatorToCourseSchema();
  }
};

export default setUpCollections;
