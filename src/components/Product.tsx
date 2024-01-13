"use client";
import { Product } from "@/type/type";

import AddWishlist from "./AddWishlist";
import { useRouter } from "next/navigation";

interface Props {
  data: Product;
}

export default function ProductCard({ data }: Props) {
  const router = useRouter();
  return (
    <>
      <div className="relative m-5 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md align-middle justify-center">
        <div className="p-5 justify-center align-middle">
          <img
            className=" h-40 object-contain justify-center align-middle "
            onClick={() => router.push(`/products/${data.slug}`)}
            src={data.thumbnail}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span>
        </div>

        <div className="mt-4 px-5 pb-5 h-30">
          <h5 className="text-xl tracking-tight text-slate-900">{data.name}</h5>
          <div className="flex justify-between items-center gap-5">
            <div className="mt-2 mb-5 flex justify-between">
              <p>
                <span className="text-xl font-bold text-slate-900">
                  ${(data.price - data.price * 0.39).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className=" px-5 pb-5">
          <AddWishlist data={data} />
        </div>
      </div>
    </>
  );
}
