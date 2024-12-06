import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import travelApi from '~/apis/travels.api';
import { TravelModel } from '~/models/travels.model';

interface TravelState {
    travel: TravelModel | null;
    loading: boolean;
    error: string | null;
}

const initialState: TravelState = {
    travel: null,
    loading: false,
    error: null
};

export const fetchTravel = createAsyncThunk(
    'travel/fetchTravel',
    async (_, { rejectWithValue }) => {
        try {
            const response = await travelApi.fetchAllTravels();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch travel');
        }
    }
);

const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        logout: (state) => {
            state.travel = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTravel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTravel.fulfilled, (state, action: PayloadAction<TravelModel>) => {
                state.travel = action.payload;
                state.loading = false;
            })
            .addCase(fetchTravel.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = travelSlice.actions;
export default travelSlice.reducer;