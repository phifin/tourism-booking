import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import travelApi from '~/apis/travels.api'
import { TravelModel } from '~/models/travels.model'

interface TravelState {
  travels: TravelModel[] | null
  isLoading: boolean
  error: string | null
}

const initialState: TravelState = {
  travels: [],
  isLoading: false,
  error: null
}

// Định nghĩa rõ ràng kiểu cho rejectValue
export const fetchTravel = createAsyncThunk<
  TravelModel[], // Kiểu dữ liệu trả về là một mảng TravelModel
  void, // Không có tham số đầu vào
  { rejectValue: string } // Kiểu rejectValue là string
>('travel/fetchTravel', async (_, { rejectWithValue }) => {
  try {
    const response = await travelApi.fetchAllTravels()
    return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || 'Failed to fetch travel')
    }
    return rejectWithValue('An unknown error occurred')
  }
})

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    logout: (state) => {
      state.travels = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravel.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTravel.fulfilled, (state, action: PayloadAction<TravelModel[]>) => {
        state.travels = action.payload
        state.isLoading = false
      })
      // Sửa lại phần rejected, đảm bảo payload là string
      .addCase(fetchTravel.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false
        // Chắc chắn rằng error luôn là một string
        state.error = action.payload || 'An unknown error occurred'
      })
  }
})

export default travelSlice.reducer
