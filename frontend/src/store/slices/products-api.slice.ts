import { PRODUCTS_URL } from '../../constants';

import { apiSlice } from './api.slice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: () => ({
          url: PRODUCTS_URL,
        }),
        keepUnusedDataFor: 5,
      }),
    };
  },
});

export const { useGetProductsQuery } = productsApiSlice;
