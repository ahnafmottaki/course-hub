import db from "../db/db.js";

const attachValidatorToCourseSchema = async () => {
  try {
    await db.createCollection("courses", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [
            "title",
            "thumbnail",
            "description",
            "status",
            "level",
            "price",
            "tags",
            "instructor",
            "language",
            "publishedAt",
            "updatedAt",
          ],
          properties: {
            _id: { bsonType: "objectId" },
            title: {
              bsonType: "string",
              description: "must be a string and is required",
              maxLength: 200,
              minLength: 5,
            },
            thumbnail: {
              bsonType: "string",
              pattern: "^https?:\\/\\/.+\\.(jpg|jpeg|png|webp|gif)$",
              description: "must be a string and is required",
            },
            description: {
              bsonType: "string",
              minLength: 20,
              description: "must be a string and is required",
            },
            status: {
              bsonType: "string",
              enum: ["pending", "approved", "rejected"],
              description: "must be a string and is required",
            },
            level: {
              bsonType: "string",
              enum: ["beginner", "intermediate", "advanced"],
              description: "must be a enum and is required",
            },
            price: {
              bsonType: "double",
              description: "must be a double and is required",
              minimum: 0,
              maximum: 200,
            },
            tags: {
              bsonType: "array",
              maxItems: 10,
              minItems: 1,
              uniqueItems: true,
              items: {
                bsonType: "string",
                maxLength: 50,
                description: "must be a string ",
              },
              description: "must be an array and is required",
            },
            instructor: {
              bsonType: "objectId",
              description: "must be a objectId and is required",
            },
            language: {
              // i can set it to enum and set all the available language to it
              bsonType: "string",
              description: "must be a string and is required",
            },
            outline: {
              bsonType: "array",
              uniqueItems: true,
              description: "must be an array of objectId",
              items: {
                bsonType: "objectId",
                description: "must be a objectId and is required",
              },
            },
            duration: {
              bsonType: "long",
              minimum: 0,
              description: "must be a long and in milliseconds",
            },
            publishedAt: {
              bsonType: "date",
              description: "must be a date and is required",
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date and is required",
            },
          },
          additionalProperties: false,
        },
      },
    });
  } catch (err) {
    if (err.codeName !== "NamespaceExists") {
      throw err;
    }
  }
};

export default attachValidatorToCourseSchema;
