"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatePrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import basket from "@/public/empty-cart.png";
export default function Cart() {
  const cartStore = useCartStore();
  console.log(cartStore);

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        <h1>Here is your shopping list 📃</h1>
        {cartStore.cart.map((item) => (
          <div key={item.id} className="flex py-4 gap-y-48">
            <Image
              key={item.id}
              className="rounded-md h-24"
              src={item.image}
              height={120}
              width={120}
              alt={item.name}
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2 text-md">
                <h2>{item.quantity}</h2>
                <button className="hover:cursor-pointer">
                  <IoRemoveCircle
                    onClick={() =>
                      cartStore.removeProduct({
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        unit_amount: item.unit_amount,
                        quantity: item.quantity,
                      })
                    }
                  />
                </button>
                <button
                  className="hover:cursor-pointer"
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>

              <p className="text-sm">
                {item.unit_amount && formatePrice(item.unit_amount)}
              </p>
            </div>
          </div>
        ))}
        {cartStore.cart.length > 0 && (
          <button className="py-2 mt-4 bg-teal-700 w-full rounded-lg text-white hover:bg-teal-800">
            CheckOut
          </button>
        )}
        {!cartStore.cart.length && (
          <div className="flex flex-col items-center justify-center gap-12 text-2xl font-medium pt-56">
            <Image src={basket} alt="Empty Cart" width={200} height={200} />
            <h2 className="text-lg font-semibold">Your cart is empty 😔</h2>
          </div>
        )}
      </div>
    </div>
  );
}
