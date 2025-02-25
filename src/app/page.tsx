/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import Link from "next/link";
import Image from 'next/image'
import { FaStar, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";

export default function Home() {
  const [category, setCategory] = useState("laptops");
  const categoryList = ["laptops", "furniture", "groceries"];
  const { products, setProducts } = useProductStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category/" + category
        );
        setProducts(response.data.products);
        console.log("Fetched Data:", response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [category, setProducts]);

  return (
    <div className="min-h-screen flex justify-center items-center font-sans py-8">
      <div
        style={{
          overflowY: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        className="w-[375px] h-[812px] rounded-[40px] bg-[#171616] p-[26px]"
      >
        <h1 className="text-white text-4xl mt-[79px]">Product List</h1>

        <div className="flex gap-4 mt-6 font-semibold">
          {categoryList.map((product, index) => {
            return (
              <div
                key={index + 1}
                onClick={() => setCategory(product)}
                className={`px-[15px] py-[9px] capitalize cursor-pointer rounded-xl ${
                  category === product
                    ? "bg-[#F9D03F] text-black"
                    : "text-[#696969]"
                }`}
              >
                {product}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-7 mt-8">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
                className="w-[143px] h-[213px] rounded-xl bg-[#1F1F1F] p-4 text-white text-sm flex flex-col gap-1"
              >
                {/* <img
                  className="w-24 h-20 mx-auto mt-2 object-contain"
                  src={product.images[0]}
                  alt={product.title}
                /> */}
                <Image 
                  className="h-20 mx-auto mt-2 object-contain"
                  src={product.images[0]}
                  alt={product.title}
                  width={96}
                  height={80}
                />
                <div className="flex gap-1 items-center">
                  <FaStar color="yellow" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <h2 className="truncate">{product.title}</h2>
                <p className="truncate font-light text-xs">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <p className="">${product.price}</p>
                  <FaPlus color="yellow" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
