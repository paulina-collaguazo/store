import { XCircleIcon } from "@heroicons/react/16/solid";
import { useShoppingContext} from "../../Context";
import { Link } from "react-router";
import { totalPrice } from "../../utils";
import OrderCart from "../OrderCart";
import "./style.css";

const CheckoutSideMenu = () => {
  const context = useShoppingContext();

  const handleCheckout = () => {
    
    const currentDate: Date = new Date();
    const formattedCurrentDate: string = currentDate.toLocaleDateString("es-ES");

    const detailOrder = {
    
      date: formattedCurrentDate,
      products: context.listProducts,
      totalPriceProducts: totalPrice(context.listProducts),
      totalProducts: context.listProducts.length,
    };
    //agregamos a la lista de ordenes, la nueva orden de compras
    context.setMyOrder([...context.myOrder, detailOrder]);
    //luego lo limpiamos al chekcout side menu
    context.setListProducts([]);
    context.setSearchByTitle('');
  };

  return (
    <aside
      className={`${
        context.isShopingCartOpen ? "flex" : "hidden"
      } shopping-cart flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2> My order</h2>
        <div>
          <XCircleIcon
            className="size-6 text-blue-500"
            onClick={() => context.closeShopingCart()}
          />
        </div>
      </div>
      <div className="px-6 overflow-y-auto flex-1 flex-col gap-2">
        {context.listProducts?.map((product) => {
          return (
            <OrderCart
              key={product.id}
              product={product}
              flag={true}
            />
          );
        })}
      </div>

      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total: </span>
          <span className="font-medium">
            {totalPrice(context.listProducts)}
          </span>
        </p>
      </div>
      <Link to="/my-orders/last">
        <button
          className="bg-black py-3 text-white w-full rounded-lg"
          onClick={() => handleCheckout()}
        >
          {" "}
          Checkout
        </button>
      </Link>
    </aside>
  );
};
export default CheckoutSideMenu;
