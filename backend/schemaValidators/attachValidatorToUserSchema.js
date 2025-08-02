import db from "../db/db.js";

const attachValidatorToUserSchema = async () => {
  try {
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [
            "name",
            "email",
            "password",
            "profilePic",
            "role",
            "createdAt",
            "updatedAt",
          ],
          properties: {
            _id: {
              bsonType: "objectId",
            },
            name: {
              bsonType: "string",
              description: "must be a string and is required",
              minLength: 6,
              maxLength: 20,
            },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z][a-zA-Z0-9._-]*@gmail.com$",
              description: "must be a string and is required",
            },
            password: {
              bsonType: "string",
              minLength: 6,
              description: "must be a string and is required",
            },
            profilePic: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            role: {
              bsonType: "string",
              enum: ["admin", "instructor", "student"],
              description: "must be a string and is required",
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date and is required",
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date and is required",
            },
          },
        },
      },
    });
  } catch (error) {
    if (error.codeName !== "NamespaceExists") {
      throw error;
    }
  }
};

export default attachValidatorToUserSchema;
