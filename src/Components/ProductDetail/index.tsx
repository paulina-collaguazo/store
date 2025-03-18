import React, { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useShoppingContext } from "../../Context";
import "./style.css";

const ProductDetail = () => {
  const context = useShoppingContext();

  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className=" flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div>
          <XCircleIcon
            className="size-6 text-blue-500"
            onClick={() => context.closeProductDetail()}
          />
        </div>
      </div>
      <figure>
        <img
          className="w-full h-full px-4 rounded-lg"
          src={context.selectedProduct?.images[0].replace('["', "").replace('"', "")}
          alt={context.selectedProduct?.title}
        />
        <p className="flex flex-col p-6">
          <span className="font-medium text-2xl">
            ${context.selectedProduct?.price}
          </span>
          <span className="font-medium text-md">
            {context.selectedProduct?.title}
          </span>
          <span className="font-medium text-sm">
            {context.selectedProduct?.description}
          </span>
        </p>
      </figure>
    </aside>
  );
};
export default ProductDetail;
