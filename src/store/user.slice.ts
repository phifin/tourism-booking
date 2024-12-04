// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserModel } from '../models/user.model';

// Define the initial state
interface UserState {
    user: UserModel | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

// Create an async thunk for fetching the user
export const fetchUser = createAsyncThunk<UserModel, void>(
    'user/fetchUser',
    async () => {
        const response = await axios.get('http://localhost:3000/api/user');
        return response.data; // Ensure the response matches UserModel
    }
);

// Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser(state) {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            });
    },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
