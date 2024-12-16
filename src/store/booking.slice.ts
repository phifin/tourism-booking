import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import bookingApi from '~/apis/booking.api';
import { BookingModel } from '~/models/booking.model';

interface BookingState {
    bookings: BookingModel[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    isLoading: false,
    error: null
};

export const fetchBookingsByUserId = createAsyncThunk(
    'travel/fetchBookingsByUserId',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await bookingApi.getAllBookingsByUserId(userId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch booking');
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        logout: (state) => {
            state.bookings = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingsByUserId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBookingsByUserId.fulfilled, (state, action: PayloadAction<BookingModel[]>) => {
                state.bookings = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchBookingsByUserId.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default bookingSlice.reducer;