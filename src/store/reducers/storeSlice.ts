import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StoreState {
    favorites: string[];
    deleted: string[];
}

const initialState: StoreState = {
    favorites: [],
    deleted: [],
};

export const storeSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<string>) {
            state.favorites.push(action.payload);
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(
                (f: string) => f !== action.payload
            );
        },
        deleteItem(state, action: PayloadAction<string>) {
            state.deleted.push(action.payload);
        },
    },
});

export default storeSlice.reducer;
