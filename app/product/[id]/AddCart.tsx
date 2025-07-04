"use client";
import { useCartStore } from "@/store";
import { AddCartTypes } from "@/types/AddCartTypes";
const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartTypes) => {
  const cartStore = useCartStore();

  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({ id, image, unit_amount, quantity, name })
        }
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
      >
        Add to cart
      </button>
    </>
  );
};

export default AddCart;
