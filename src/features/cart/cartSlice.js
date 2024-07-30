import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 11,
    //   name: "Spinach and Mushroom",
    //   quantity: 1,
    //   unitPrice: 15,
    //   totalPrice: 15,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    additem(state, { payload }) {
      const already = state.cart.find(
        (item) => item.pizzaId === payload.pizzaId,
      );
      if (already) {
        already.quantity++;
        already.totalPrice = already.unitPrice * already.quantity;
      } else {
        state.cart.push(payload);
      }
    },
    deleteitem(state, { payload }) {
      state.cart = state.cart.filter((item) => item.pizzaId !== payload);
    },
    increasequantity(state, { payload }) {
      const item = state.cart.find((item) => item.pizzaId === payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreasequantity(state, { payload }) {
      const item = state.cart.find((item) => item.pizzaId === payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      item.quantity === 0 &&
        cartSlice.caseReducers.deleteitem(state, { payload });
    },
    clearcart(state) {
      state.cart = [];
    },
  },
});

export const {
  additem,
  deleteitem,
  increasequantity,
  decreasequantity,
  clearcart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getcart = (state) => state.cart.cart;

export const getname = (state) => state.user.name;

export function gettotalprice(state) {
  return state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
}

export const getitemquantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
