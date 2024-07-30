import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gettotalprice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function numberofpizza(cart) {
  return cart.reduce((acc, item) => {
    return item.quantity + acc;
  }, 0);
}

// function totalcartprice(cart) {
//   return cart.reduce((acc, item) => {
//     return item.totalPrice + acc;
//   }, 0);
// }

function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const noofcartpizzas = numberofpizza(cart);
  const totalcartprice = useSelector(gettotalprice);

  if (!cart.length) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{noofcartpizzas} pizzas</span>
        <span>{formatCurrency(totalcartprice)}</span>
      </p>
      <Link to={"/cart"}>Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
