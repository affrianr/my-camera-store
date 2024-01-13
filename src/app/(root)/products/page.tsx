"use client";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Pagination, Product } from "@/type/type";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export type searchFunction = (n: string) => any;

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState<string>("");

  async function fetchProducts() {
    if (search) {
      const dataProduct = await fetch(
        `http://localhost:3000/api/products?search=${search}`
      );

      const products: Pagination = await dataProduct.json();

      setData(products.data ? products.data : []);
      if (data.length === products.totalItem) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    } else {
      const dataProduct = await fetch(
        `http://localhost:3000/api/products?page=${page}`
      );
      // selain ngasih Promise<Product[]> di atas, bisa dikasih type/interface ketika mendeklarasikan di sini, const products: Product[] = await data.json()
      const products: Pagination = await dataProduct.json();

      setData([...data, ...(products.data ? products.data : [])]);
      if (data.length === products.totalItem) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="pt-5">
      <SearchBar setSearch={setSearch} />
      <div className=" pt-18">
        {/* <div className="p-5 mx-auto max-w-7xl sm:grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4">
        {data.map((item) => (
          <ProductCard key={item.slug} data={item} />
        ))}
      </div> */}
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={fetchProducts}
          hasMore={hasMore}
          loader={<h1 className="text-center text-4xl">...</h1>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>End of content</b>
            </p>
          }
          // below props only if you need pull down functionality
        >
          <div className="mx-auto max-w-7xl sm:grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4">
            {data.map((item) => (
              <ProductCard key={item.slug} data={item} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
