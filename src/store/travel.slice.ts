import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import travelApi from '~/apis/travels.api'
import { TravelModel, TravelModelWithPage } from '~/models/travels.model'

interface TravelState {
  travels: TravelModel[]
  // travels: TravelModelWithPage[] | null
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

export const fetchTravelByPage = createAsyncThunk<
  TravelModelWithPage, // Kiểu dữ liệu trả về là một mảng TravelModelWithPage
  { page: number, travelType: string }, // Tham số đầu vào là một object chứa page và travelType
  { rejectValue: string } // Kiểu rejectValue là string
>('travel/fetchTravelByPage', async ({ page, travelType }, { rejectWithValue }) => {
  try {
    const response = await travelApi.getTravelByPage(page, travelType)
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
      state.travels = []
    }
  },
  extraReducers: (builder) => {
    builder
      // // This is for fetching travel by page
      // .addCase(fetchTravelByPage.pending, (state) => {
      //   state.isLoading = true
      //   state.error = null
      // })
      // .addCase(fetchTravelByPage.fulfilled, (state, action: PayloadAction<TravelModelWithPage>) => {
      //   state.travels = [...state.travels!, action.payload]
      //   state.isLoading = false
      // })
      // .addCase(fetchTravelByPage.rejected, (state, action: PayloadAction<string | undefined>) => {
      //   state.isLoading = false
      //   state.error = action.payload || 'An unknown error occurred'
      // })
      // This is for fetching all travels
      .addCase(fetchTravel.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTravel.fulfilled, (state, action: PayloadAction<TravelModel[]>) => {
        state.travels = action.payload
        state.isLoading = false
      })
      .addCase(fetchTravel.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false
        state.error = action.payload || 'An unknown error occurred'
      })
  }
})

export default travelSlice.reducer
