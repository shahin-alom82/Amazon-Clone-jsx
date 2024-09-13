import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
      cart: [],
      userInfo: null,
};

export const amazonSlice = createSlice({
      // name
      name: "amazon",
      // initialState
      initialState,

      reducers: {
            addToCart: (state, action) => {
                  const shofyProduct = state.cart.find((item) => item.id === action.payload.id);
                  if (shofyProduct) {
                        toast.error("Product already exists");
                        shofyProduct.quantity += 1; // Removed the '!' operator
                  } else {
                        state.cart.push({ ...action.payload, quantity: 1 });
                  }
            },

            cartDelete: (state, action) => {
                  state.cart = state.cart.filter((item) => item.id !== action.payload);
            },

            increase: (state, action) => {
                  const shofyProduct = state.cart.find((item) => item.id === action.payload);
                  if (shofyProduct) {
                        shofyProduct.quantity += 1; // Removed the '!' operator
                  }
            },

            decrease: (state, action) => {
                  const shofyProduct = state.cart.find((item) => item.id === action.payload);
                  if (shofyProduct && shofyProduct.quantity > 1) {
                        shofyProduct.quantity -= 1; // Removed the '!' operator and added a check
                  } else {
                        toast.error("Quantity cannot be less than 1");
                  }
            },

            addToUser: (state, action) => {
                  state.userInfo = action.payload;
            },

            removeUser: (state) => {
                  state.userInfo = null;
            },
      },
});

export const { addToUser, removeUser, addToCart, decrease, increase, cartDelete } = amazonSlice.actions;
export default amazonSlice.reducer;
