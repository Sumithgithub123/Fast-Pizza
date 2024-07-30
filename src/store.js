import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./features/user/userSlice";
import cartreducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userreducer,
    cart: cartreducer,
  },
});

export default store;
