import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? // @ts-expect-error
    JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const cartSliceReducer = cartSlice.reducer;
