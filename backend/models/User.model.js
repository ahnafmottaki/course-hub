import { ObjectId } from "mongodb";
import db from "../db/db.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

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

  // toDocument() {
  //   return {
  //     name: this.name,
  //     email: this.email,
  //     password: this.password,
  //     profilePic: this.profilePic,
  //     role: this.role,
  //     createdAt: this.createdAt,
  //     updatedAt: this.updatedAt,
  //   };
  // }

  async save() {
    this.password = await bcrypt.hash(this.password, 12);
    const insertResponse = await User.getCollection().insertOne(this, {
      writeConcern: { j: true },
    });
    if (!insertResponse.insertedId) {
      throw new AppError("User creation failed");
    }
    this._id = insertResponse.insertedId;
    const { password, ...userData } = this;
    return userData;
  }

  // * static method goes below this

  // find methods
  static findByEmail(email) {
    if (!email) throw new AppError("Invalid Email!");
    return User.getCollection().findOne(
      { email },
      { projection: { password: 0 } }
    );
  }

  static async findById(id) {
    if (!id || !ObjectId.isValid(id)) {
      throw new AppError("Invalid Id parameter", 400);
    }
    return User.getCollection().findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
  }

  static getCollection() {
    return db.collection("users");
  }
}

export default User;
