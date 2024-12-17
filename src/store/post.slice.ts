import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postApi } from '~/apis/post.api';
import { PostModel } from '~/models/post.model';

interface PostState {
    data: PostModel[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: PostState = {
    data: [],
    isLoading: false,
    error: null
};

export const fetchAllPosts = createAsyncThunk(
    'travel/fetchAllPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await postApi.getAllPosts();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch post');
        }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<PostModel[]>) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllPosts.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default postSlice.reducer;
