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
  error: null,
};

interface EditUserProps {
  id: string;
  data: Partial<UserModel>
}

interface ToggleBookmarkProps {
  id: string
  travelId: string
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

export const editUser = createAsyncThunk(
  'user/editUser',
  async (body: EditUserProps, { rejectWithValue }) => {
    try {
      userApi.editUserById(body.id, body.data);
      return body;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to edit user');
    }
  }
)

export const toggleUserTravelingBookmark = createAsyncThunk(
  'user/toggleUserTravelingBookmark',
  async (body: ToggleBookmarkProps, { rejectWithValue }) => {
    try {
      userApi.toggleBookmark(body.id, body.travelId);
      return body;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to toggle bookmark');
    }
  }
)

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
      // Edit User Cases
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<EditUserProps>) => {
        if (state.data) {
          state.data = { ...state.data, ...action.payload.data }; // Merge the passed data with current user data
        }
        state.loading = false;
      })
      .addCase(editUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Bookmark Cases
      .addCase(toggleUserTravelingBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserTravelingBookmark.fulfilled, (state, action: PayloadAction<ToggleBookmarkProps>) => {
        if (state.data) {
          if (!state.data.bookmarksId) {
            state.data.bookmarksId = [];
          }
          const index = state.data.bookmarksId.indexOf(action.payload.travelId);
          if (index === -1) {
            state.data.bookmarksId.push(action.payload.travelId);
          } else {
            state.data.bookmarksId.splice(index, 1);
          }
        }
        state.loading = false;
      })
      .addCase(toggleUserTravelingBookmark.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
