import { createSlice } from '@reduxjs/toolkit';

import { updateCart } from '../../utils/cart.utils';

// const initialState = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { cartItems: [] };

const storedCart = localStorage.getItem('cart');
const initialState = storedCart ? JSON.parse(storedCart) : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x: { _id: any }) => x._id === item._id,
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x: { _id: any }) =>
          x._id === existItem._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x: { _id: any }) => x._id !== action.payload,
      );

      return updateCart(state);
    },
  },
});

export const cartSliceReducer = cartSlice.reducer;

export const { addToCart, removeFromCart } = cartSlice.actions;
