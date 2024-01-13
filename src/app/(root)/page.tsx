import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyCamera Store",
  description:
    "MyCamera Store is the right place to buy your photography needs",
};

export default async function Home() {
  return (
    <>
      <div className="mb-5 relative">
        <img
          src="https://sony.scene7.com/is/image/sonyglobalsolutions/Desktop_PrimaryTout?$toutDesktop$"
          alt=""
        />
        <h1 className="absolute text-3xl text-white top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 font-semibold">
          Unleash the raw power
        </h1>
      </div>
      <div>
        <div className="flex justify-center sm:text-4xl">
          <h1 className="underline-offset-8 underline">Featured Products</h1>
        </div>
        <div className="p-4 mx-auto max-w-7xl"></div>
      </div>
    </>
  );
}
