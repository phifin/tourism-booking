import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import travelApi from '~/apis/travels.api';
import { TravelModel } from '~/models/travels.model';

interface TravelState {
    travels: TravelModel[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: TravelState = {
    travels: [],
    isLoading: false,
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
            state.travels = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTravel.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTravel.fulfilled, (state, action: PayloadAction<TravelModel[]>) => {
                state.travels = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTravel.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default travelSlice.reducer;