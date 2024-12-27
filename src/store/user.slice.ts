import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { userApi } from '~/apis/user.api'
import { UserModel } from '~/models/user.model'

interface UserState {
  data: UserModel | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null
}

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk<
  UserModel, // Trả về kiểu UserModel
  string, // Tham số đầu vào là email kiểu string
  { rejectValue: string } // Kiểu rejectWithValue là string
>('user/fetchUser', async (email, { rejectWithValue }) => {
  try {
    const response = await userApi.fetchUserByEmail(email)
    return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || 'Failed to fetch user')
    }
    return rejectWithValue('An unknown error occurred')
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.data = action.payload
        state.loading = false
      })
      // Sửa lại phần rejected để tránh dùng any và đảm bảo payload là string
      .addCase(fetchUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        // Kiểm tra nếu payload là undefined, thì gán giá trị mặc định
        state.error = action.payload ?? 'An unknown error occurred'
      })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
