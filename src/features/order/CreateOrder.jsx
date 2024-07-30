/* eslint-disable react-refresh/only-export-components */
import EmptyCart from "../cart/EmptyCart";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearcart, getcart, gettotalprice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { clearstatus, fetchAddress, getuserlocation } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const name = useSelector((state) => state.user.name);
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const formerror = useActionData();
  const cart = useSelector(getcart);
  const totalPrice = useSelector(gettotalprice);
  const total = totalPrice + totalPrice * (withPriority ? 0.2 : 0);
  const { status, address, error, position } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 items-center md:flex md:gap-1">
          <label className="md:w-36">First Name</label>
          <div className="grow">
            <input
              className="input"
              defaultValue={name}
              type="text"
              name="customer"
              required
            />
          </div>
        </div>

        <div className="mb-5 items-center md:flex md:gap-1">
          <label className={`md:w-36 ${formerror?.phone && "md:mb-10"}`}>
            Phone number
          </label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formerror?.phone && (
              <p className="mx-1 mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">
                {formerror.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 items-center md:flex md:gap-1">
          <label className={`md:w-36 ${status === "error" && "md:mb-12"}`}>
            Address
          </label>
          <div className="grow">
            <input
              defaultValue={address}
              className="input"
              type="text"
              name="address"
              disabled={status === "loading"}
              placeholder={
                status === "loading" ? "Loading..." : "Enter Address..."
              }
              required
            />
            {!address && (
              <span
                className={`absolute right-[3px] z-10 mt-[2.7px] md:mt-[5px]`}
              >
                <Button
                  disabled={status === "loading"}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  get address
                </Button>
              </span>
            )}
            {status === "error" && (
              <p className="mx-1 mb-2 mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={submitting || status === "loading"}>
            {submitting
              ? "Placing Order..."
              : `Order Now ${formatCurrency(total)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);

  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number.We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const neworder = await createOrder(order);
  store.dispatch(clearcart());
  store.dispatch(clearstatus());
  return redirect(`/order/${neworder.id}`);
}

export default CreateOrder;
