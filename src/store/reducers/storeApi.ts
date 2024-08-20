import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Item from '../../types/Item';

export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fakestoreapi.com/',
    }),
    refetchOnFocus: true,
    endpoints: (build) => ({
        fetchAllItems: build.query<Item[], number>({
            query: (limit: number = 20) => ({
                url: 'products',
                params: {
                    limit: limit,
                },
            }),
        }),
        fetchItemById: build.query<Item, number>({
            query: (id: number) => ({
                url: `products/${id}`,
            }),
        }),
    }),
});
