// // store/userSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { UserModel } from '../models/user.model';

// // Define the initial state
// interface UserState {
//     user: UserModel | null;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: UserState = {
//     user: null,
//     loading: false,
//     error: null,
// };

// // Create an async thunk for fetching the user
// export const fetchUser = createAsyncThunk<UserModel, void>(
//     'user/fetchUser',
//     async () => {
//         console.log("====================================");

//         const response = await axios.get('http://localhost:3000/api/user/getUserByEmail/testuser@gmail.com');
//         console.log('====================================');
//         console.log(response.data);
//         console.log('====================================');
//         return response.data; // Ensure the response matches UserModel
//     }
// );

// // Create the slice
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         resetUser(state) {
//             state.user = null;
//             state.error = null;
//             state.loading = false;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
//                 state.loading = false;
//                 state.user = action.payload;
//             })
//             .addCase(fetchUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message || 'Failed to fetch user';
//             });
//     },
// });

// export const { resetUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserModel {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    number: string;
    userFriends: never[];
    refreshToken: string;
    bookmarkedTravels: string[];
    updatedAt: string;
    profileImageUrl: string;
}

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

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/user/getUserByEmail/${email}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
