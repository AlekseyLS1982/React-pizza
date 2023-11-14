import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import sort from "./slices/cartSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    sort,
    cart,
    pizza,
  },
});
