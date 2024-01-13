import { ObjectId } from "mongodb";
import { getCollection } from "../config/mongo";
import { User, NewUser } from "@/type/type";
import { hashPassword } from "../helpers/bcrypt";
import { z } from "zod";

const UserInput = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address " }),
  username: z.string(),
  password: z.string().min(5, { message: "must be 5 or more characters long" }),
});

class UserModel {
  static getDb() {
    return getCollection("users");
  }

  static async create(data: NewUser) {
    return await this.getDb().insertOne({
      ...data,
      password: hashPassword(data.password),
    });
  }

  static async findById(id: string) {
    const user = (await this.getDb().findOne({
      _id: new ObjectId(id),
    })) as User | null;
    return user;
  }

  static async findByEmail(email: string) {
    const user = (await this.getDb().findOne({ email })) as User;
    return user;
  }
}

export default UserModel;
