import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from './reducers/storeApi';
import storeSlice from './reducers/storeSlice';

const store = configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        store: storeSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
