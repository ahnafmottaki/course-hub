import { ObjectId } from "mongodb";
import { db } from "../db/mongodb.init.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

db.createCollection("users", {
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

class User {
  constructor({ name, email, password, profilePic }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.profilePic = profilePic;
    this.role = "student";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toDocument() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      profilePic: this.profilePic,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async save() {
    this.password = await bcrypt.hash(this.password, 12);
    const insertResponse = await User.getCollection().insertOne(this, {
      writeConcern: { j: true },
    });
    if (!insertResponse.insertedId) {
      throw new AppError("User creation failed");
    }
    this._id = insertResponse.insertedId;
    return this;
  }

  // * static method goes below this

  // find methods
  static findByEmail(email) {
    if (!email) throw new AppError("Invalid Email!");
    return User.getCollection().findOne({ email });
  }

  static async findById(id) {
    if (!id || !ObjectId.isValid(id)) {
      throw new AppError("Invalid Id parameter", 400);
    }
    return User.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static getCollection() {
    return db.collection("users");
  }
}

export default User;
