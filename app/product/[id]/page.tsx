import Image from "next/image";
import formatePrice from "@/util/PriceFormat";
import React, { Suspense } from "react";
import Loader from "@/app/components/Loader";
import LoaderShimmer from "@/app/components/LoaderShimmer";
import { SearchParamType } from "@/types/searchParamsTypes";
import AddCart from "./AddCart";

const Product = ({ searchParams }: SearchParamType) => {
  return (
    <Suspense fallback={<LoaderShimmer />}>
      <div className="flex justify-between gap-24 p-12 text-gray-700">
        <Suspense fallback={<Loader />}>
          <Image
            src={searchParams.image}
            alt={searchParams.name}
            width={600}
            height={600}
          />
        </Suspense>
        <div className="font-medium text-gray-700">
          <h1 className="text-2xl  py-2">{searchParams.name}</h1>
          <p className="py-2">{searchParams.description}</p>
          <div className="flex flex-col gap-2">
            <p className="py-2 block">{searchParams.features}</p>

            <p className="font-bold text-teal-700">
              {searchParams.unit_amount &&
                formatePrice(searchParams.unit_amount)}
            </p>
          </div>
          <AddCart
            name={searchParams.name}
            id={searchParams.id}
            image={searchParams.image}
            unit_amount={searchParams.unit_amount}
            quantity={searchParams.quantity}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Product;
