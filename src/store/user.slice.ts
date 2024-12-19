import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '~/apis/user.api';
import { UserModel } from '~/models/user.model';

interface UserState {
    data: UserModel | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
};

interface Props {
    id: string;
    data: Partial<UserModel>
}

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await userApi.fetchUserByEmail(email);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user');
        }
    }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (body: Props, { rejectWithValue }) => {
        try {
            userApi.editUserById(body.id, body.data);
            return body;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to edit user');
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch User Cases
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit User Cases
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action: PayloadAction<Props>) => {
                if (state.data) {
                    state.data = { ...state.data, ...action.payload.data }; // Merge the passed data with current user data
                }
                state.loading = false;
            })
            .addCase(editUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
