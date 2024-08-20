import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StoreState {
    favorites: number[];
    deleted: number[];
}

const initialState: StoreState = {
    favorites: [],
    deleted: [],
};

export const storeSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<number>) {
            state.favorites.push(action.payload);
        },
        removeFavorite(state, action: PayloadAction<number>) {
            state.favorites = state.favorites.filter(
                (f: number) => f !== action.payload
            );
        },
        deleteItem(state, action: PayloadAction<number>) {
            state.deleted.push(action.payload);
        },
    },
});

export default storeSlice.reducer;
