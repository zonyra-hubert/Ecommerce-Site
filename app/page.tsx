import { Suspense } from "react";
import LoaderShimmer from "./components/LoaderShimmer";
import Stripe from "stripe";
import Product from "./components/Product";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });
  const products = await stripe.products.list();
  // getting the prices with the priduct
  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      const features = product.metadata.features || "";
      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images,
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features },
      };
    })
  );
  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <Suspense fallback={<LoaderShimmer />}>
      <main className="grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-12">
        {products.map((product) => (
          <Product
            id={product.id}
            name={product.name}
            unit_amount={product.unit_amount}
            image={product.image[0]}
            key={product.id}
            description={product.description ?? ""}
            metadata={product.metadata}
          />
        ))}
      </main>
    </Suspense>
  );
}
