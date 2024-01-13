import { ObjectId } from "mongodb";
import { getCollection } from "../config/mongo";
import { Pagination, Product } from "@/type/type";

class ProductModel {
  static getDb() {
    return getCollection("products");
  }

  static async getAll(
    limit: number,
    page: number,
    search: string
  ): Promise<Pagination> {
    if (search) {
      const totalItem = await this.getDb().countDocuments();
      const result = (await this.getDb()
        .find({
          name: { $regex: search, $options: "i" },
        })
        .toArray()) as Product[];
      return {
        totalItem,
        data: result,
      };
    }
    const totalItem = await this.getDb().countDocuments();
    const skip = ((page - 1) * limit) as number;
    const result = (await this.getDb()
      .find()
      .limit(limit)
      .skip(skip)
      .toArray()) as Product[];
    return {
      totalItem,
      data: result,
    };
  }

  static async getBySlug(slug: string): Promise<Product> {
    const result = (await this.getDb().findOne({ slug })) as Product;
    return result;
  }

  static async getByID(id: string) {
    const result = (await this.getDb().findOne({
      _id: new ObjectId(id),
    })) as Product;
    return result;
  }

  static async create(data: Product) {
    await this.getDb().insertOne(data);
  }
}

export default ProductModel;
