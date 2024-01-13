"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/type/type";
import { useState } from "react";

export default function AddWishlist({ data }: { data: Product }) {
  const [isPending, setIsPending] = useState(false);

  const handleWishlist = async () => {
    setIsPending(true);
    const response = await fetch("http://localhost:3000/api/wishlist", {
      method: "POST",
      body: JSON.stringify(data._id),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
        className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        {isPending ? "" : "Add"}
      </button>
    </>
  );
}
