import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";
import { useShoppingContext } from "../../Context";

const NavBar = () => {
  const activeStyle: string = "underline underline-offset-4";
  const context = useShoppingContext();

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li>
          <NavLink to="/shopi" onClick={() => context.setSearchByCategory("")}>
            Shopi
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/clothes"
            onClick={() => context.setSearchByCategory("clothes")}
            className={({ isActive }) => (isActive ? activeStyle : '') }
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : '') }
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furniture"
            onClick={() => context.setSearchByCategory("furniture")}
            className={({ isActive }) => (isActive ? activeStyle : '')}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shoes"
            onClick={() => context.setSearchByCategory("shoes")}
            className={({ isActive }) => (isActive ? activeStyle : '')}
          >
            Shoes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            className={({ isActive }) => (isActive ? activeStyle : '')}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li>paulina@gmail.com</li>
        <li>
          <NavLink to="/my-orders">My orders</NavLink>
        </li>
        <li>
          <NavLink to="/my-account">My Account</NavLink>
        </li>
        <li>
          <NavLink to="/electronics"></NavLink>
        </li>
        <li className="flex items-center">
          <ShoppingCartIcon
            className="size-6 text-black"
            onClick={() => context.openShopingCart()}
          />
          <div>{context.listProducts?.length}</div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
