"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/type/type";
import { useState } from "react";

export default function AddWishlistButton({ data }: { data: Product }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleWishlist = async () => {
    setIsPending(true);
    const response = await fetch(
      "https://my-camera-store-nfjw.vercel.app/api/wishlist",
      {
        method: "POST",
        body: JSON.stringify(data._id),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("ADD WISHLIST ERROR");
    }
    setIsPending(false);
  };

  return (
    <>
      <button
        disabled={isPending}
        onClick={handleWishlist}
        className="flex items-center"
      >
        <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
          </svg>
        </div>
      </button>
    </>
  );
}
