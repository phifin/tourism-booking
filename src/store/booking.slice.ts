import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import bookingApi from '~/apis/booking.api'
import { BookingModel } from '~/models/booking.model'

interface BookingState {
  bookings: BookingModel[] | null
  isLoading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  isLoading: false,
  error: null
}

export const fetchBookingsByUserId = createAsyncThunk<
  BookingModel[], // Trả về kiểu BookingModel[]
  string, // Tham số đầu vào là userId kiểu string
  { rejectValue: string } // Kiểu trả về của rejectWithValue là string
>('travel/fetchBookingsByUserId', async (userId, { rejectWithValue }) => {
  try {
    const response = await bookingApi.getAllBookingsByUserId(userId)
    return response
  } catch (error: unknown) {
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { data: string } }
      return rejectWithValue(axiosError.response?.data || 'Failed to fetch booking')
    }
    return rejectWithValue('An unknown error occurred')
  }
})

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    logout: (state) => {
      state.bookings = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsByUserId.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBookingsByUserId.fulfilled, (state, action: PayloadAction<BookingModel[]>) => {
        state.bookings = action.payload
        state.isLoading = false
      })
      // Sửa lại phần rejected để đảm bảo `payload` luôn là `string`
      .addCase(fetchBookingsByUserId.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false
        // Kiểm tra payload có phải là string trước khi gán cho state.error
        state.error = action.payload ?? 'Unknown error occurred'
      })
  }
})

export default bookingSlice.reducer
