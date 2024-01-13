import { NewWishlist, Wishlist } from "@/type/type";
import { getCollection } from "../config/mongo";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { parse } from "path";

const WishListInput = z.object({
  userId: z.instanceof(ObjectId),
  productId: z.instanceof(ObjectId),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

class WishlistModel {
  static getDb() {
    return getCollection("wishlist");
  }

  static async create(data: NewWishlist) {
    const parseResult = WishListInput.safeParse(data);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    return await this.getDb().insertOne(data);
  }

  static async find(userId: ObjectId, productId: ObjectId) {
    const findDuplicate = await this.getDb().findOne({ userId, productId });
    return findDuplicate;
  }

  static async getByUserId(userId: string) {
    const wishlist = (await this.getDb()
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
      ])
      .toArray()) as Wishlist[] | null;
    return wishlist;
  }

  static async delete(id: string) {
    return await this.getDb().deleteOne({ _id: new ObjectId(id) });
  }
}

export default WishlistModel;
