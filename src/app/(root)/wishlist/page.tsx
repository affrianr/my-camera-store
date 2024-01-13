"use client";
import WishlistList from "@/components/WishtlistList";
import { Wishlist } from "@/type/type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const [data, setData] = useState<Wishlist[]>([]);
  async function fetchWishlist() {
    const res = await fetch("http://localhost:3000/api/wishlist");
    const data = (await res.json()) as Wishlist[];

    setData(data);
  }

  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <>
      <section className="py-10 bg-white font-poppins">
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6 ">
          <div>
            <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
              Your Wishlist
            </h2>
            <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
              <div className="flex-wrap justify-between hidden mb-6 -mx-4 md:flex md:mb-8">
                <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                  <h2 className="font-bold text-gray-500 dark:text-gray-400">
                    Product name
                  </h2>
                </div>

                <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500 dark:text-gray-400">
                    Action
                  </h2>
                </div>
              </div>
              {data.map((item, index) => (
                <WishlistList data={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
