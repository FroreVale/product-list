"use client";

/* eslint-disable @next/next/no-img-element */
import { useProductStore } from "@/store/useProductStore";
import { use } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { GrSubtractCircle } from "react-icons/gr";
import { useRouter } from "next/navigation";
import Image from 'next/image'

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { products, quantities, increaseQuantity, decreaseQuantity } =
    useProductStore();
  const product = products.find((p) => p.id === Number(id)) ?? null;

  const router = useRouter();
  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Product not found.</p>
      </div>
    );
  }

  const quantity = quantities[product.id] || 1;

  return (
    <div className="min-h-screen flex justify-center items-center font-sans py-8">
      <div className="w-[375px] h-[812px] rounded-[40px] bg-[#171616] p-[26px] text-white">
        <div>
          <IoIosArrowBack
            color="white"
            size={24}
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
        </div>
        <Image
          className="mx-auto mt-16 object-contain"
          src={product.images[0]}
          alt={product.title}
          width={315}
          height={280}
        />
        <div className="flex justify-between gap-4 items-center mt-8">
          <h2 className="text-2xl">{product.title}</h2>
          <div className="flex gap-1 items-center">
            <FaStar color="yellow" size={18} />
            <span className="text-xl ">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-3 font-normal text-sm text-[#FCF9F2]">
          {product.description}
        </p>
        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-4">
            <GrSubtractCircle
              size={24}
              color={`${quantity <= 1 ? "#696969" : "#F9D03F"}`}
              onClick={() => decreaseQuantity(product.id)}
              className="cursor-pointer"
            />
            <span className="text-[#F9D03F]">{quantity}</span>
            <GrAddCircle
              size={24}
              color="#F9D03F"
              onClick={() => increaseQuantity(product.id)}
              className="cursor-pointer"
            />
          </div>
          <span className="text-2xl">${product.price}</span>
        </div>
        <div className="mt-20 flex justify-center items-center">
          <button className="text-black font-semibold bg-yellow-500 rounded-xl w-[315px] h-[56px]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
