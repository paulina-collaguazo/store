
import React from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/16/solid";
import { useShoppingContext, Product } from "../../Context";

interface CardProps {
    product: Product
}

const Card = ( {product} : CardProps)=> {
  
  const context = useShoppingContext();
 
  let imageUrl = product.images[0].replace('["', "").replace('"]', "");

  if (imageUrl.search("placeimg") >= 0) {
    imageUrl = product.category.image;
  } else if (imageUrl.search("pravatar") >= 0) {
    imageUrl = imageUrl.replace("pravatar", "i.pravatar");
  }

  const showProduct = (productDetail: Product) => {
    context.openProductDetail();
    context.setSelectedProduct(productDetail);
    context.closeShopingCart();
  };

  const openCheckoutSideMenu = (event: React.MouseEvent, product: Product) => {
    event.stopPropagation();
    context.storeProductsSelected(product);
    context.openShopingCart();
    context.closeProductDetail();
  };

  const renderIcon = (id: number) => {
    let isIconCardSelected =
      context.listProducts.filter(
        (productSelected: Product) => productSelected.id === id
      ).length > 0;

    if (isIconCardSelected) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-green-600 w-6 h-6 rounded-full m-2 p-1">
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={() => context.setCount(context.count + 1)}
        >
          <PlusIcon
            className="h-6 w-6"
            onClick={(event) => openCheckoutSideMenu(event, product)}
          />
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct(product)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {product.category.name}
        </span>

        <img
          className="w-full h-full object-cover rounded-lg"
          src={imageUrl}
          alt="headphones"
        />

        {renderIcon(product.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light"> {product.title} </span>
        <span className="text-lg font-medium"> ${product.price} </span>
      </p>
    </div>
  );
};
export default Card;
