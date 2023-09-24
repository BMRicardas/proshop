import { createSlice } from '@reduxjs/toolkit';

// const initialState = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { cartItems: [] };

const storedCart = localStorage.getItem('cart');
const initialState = storedCart ? JSON.parse(storedCart) : { cartItems: [] };

function addDecimals(num: number) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

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

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          // eslint-disable-next-line @typescript-eslint/no-shadow
          (acc: number, item: { price: number; qty: number }) =>
            acc + item.price * item.qty,
          0,
        ),
      );

      // Calculate shipping price (if order is over €100, then free, else €10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(state.itemsPrice * 0.15);

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));

      return state;
    },
  },
});

export const cartSliceReducer = cartSlice.reducer;

export const { addToCart } = cartSlice.actions;
