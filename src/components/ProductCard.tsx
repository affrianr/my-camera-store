"use client";
import { Product } from "@/type/type";

import AddWishlist from "./AddWishlist";
import { useRouter } from "next/navigation";
import AddWishlistButton from "./AddWishlistButton";

interface Props {
  data: Product;
}

export default function ProductCard({ data }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="mt-56 m-5 bg-white rounded shadow ">
        <div className="relative z-20 p-6 group">
          <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
            <img
              onClick={() => router.push(`/products/${data.slug}`)}
              className="object-contain w-full h-full transition-all group-hover:scale-110"
              src={data.thumbnail}
              alt=""
            />
            <div className="absolute flex flex-col top-4 right-4">
              <AddWishlistButton data={data} />
              <a href="#" className="flex items-center">
                <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cart2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          <a href="#">
            <h2 className="mb-2 text-xl font-bold text-black dark:text-black">
              {data.name}
            </h2>
          </a>
          <p className="mb-3 text-lg font-bold text-blue-500 dark:text-blue-300 ">
            <span>${(data.price - data.price * 0.39).toFixed(2)} </span>
            <span className="text-xs font-semibold text-gray-400 line-through ">
              ${data.price}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
