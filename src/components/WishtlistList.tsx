import { Product, Wishlist } from "@/type/type";
import { useEffect, useState } from "react";
import RemoveWishlist from "./RemoveWishlist";
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

interface Props {
  data: Wishlist;
}

export default function WishlistList({ data }: Props) {
  const [product, setProduct] = useState<Product>();
  const [deleted, setDeleted] = useState<boolean>(false);
  const router = useRouter();

  async function fetchProduct() {
    const res = await fetch(
      "http://localhost:3000/api/products/id/" + data.productId
    );
    const result = (await res.json()) as Product;

    setProduct(result);
    router.refresh();
  }

  useEffect(() => {
    fetchProduct();
  }, [deleted]);

  return (
    <>
      <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center mb-6 -mx-4 md:mb-8">
          <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4 mb-3 md:w-1/3">
                <div className="w-full h-96 md:h-24 md:w-24">
                  <img
                    src={product?.thumbnail}
                    alt=""
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="w-2/3 px-4">
                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                  {product?.name}
                </h2>
              </div>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-2/12">
            <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
              ${(product?.price - product?.price * 0.39).toFixed(2)}
            </p>
            <span className="text-xs text-gray-500 line-through dark:text-gray-400">
              ${product?.price}
            </span>
          </div>
          <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
            <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
              <RemoveWishlist
                id={data._id}
                setDeleted={setDeleted}
                deleted={deleted}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
