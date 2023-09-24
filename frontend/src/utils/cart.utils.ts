export function addDecimals(num: number) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function updateCart(state: {
  itemsPrice: string | number;
  cartItems: any[];
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}) {
  // Calculate items price
  // eslint-disable-next-line no-param-reassign
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: number, item: { price: number; qty: number }) =>
        acc + item.price * item.qty,
      0,
    ),
  );

  // Calculate shipping price (if order is over €100, then free, else €10 shipping)
  // eslint-disable-next-line no-param-reassign
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

  // Calculate tax price (15% tax)
  // eslint-disable-next-line no-param-reassign
  state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);

  // Calculate total price
  // eslint-disable-next-line no-param-reassign
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
}
