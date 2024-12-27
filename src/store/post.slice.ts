import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { postApi } from '~/apis/post.api'
import { PostModel } from '~/models/post.model'

interface PostState {
  data: PostModel[] | null
  isLoading: boolean
  error: string | null
}

const initialState: PostState = {
  data: [],
  isLoading: false,
  error: null
}

export const fetchAllPosts = createAsyncThunk('travel/fetchAllPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await postApi.getAllPosts()
    return response
  } catch (error: unknown) {
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { data: string } }
      return rejectWithValue(axiosError.response?.data || 'Failed to fetch post')
    }
    return rejectWithValue('An unknown error occurred')
  }
})

export const likePost = createAsyncThunk(
  'post/likePost',
  async ({ userId, postId }: { userId: string; postId: string }, { rejectWithValue }) => {
    try {
      const response = await postApi.likePost(userId, postId)
      return { postId, userId, status: response.status }
      // Trả về postId và userId để cập nhật state
    } catch (error: unknown) {
      if (error instanceof AxiosError && 'response' in error) {
        const axiosError = error as { response?: { data: string } }
        return rejectWithValue(axiosError.response?.data || 'Failed to like/unlike post')
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<PostModel[]>) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(fetchAllPosts.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          state.error = 'An unknown error occurred'
        }
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<{ postId: string; userId: string }>) => {
        if (state.data) {
          const postIndex = state.data.findIndex((post) => post.id === action.payload.postId)
          if (postIndex !== -1) {
            const post = state.data[postIndex]
            if (!Array.isArray(post.likes)) {
              post.likes = [] // Ensure likes is an array
            }

            const userIdIndex = post.likes.indexOf(action.payload.userId)

            if (userIdIndex === -1) {
              // If userId is not found, add it (like)
              post.likes.push(action.payload.userId)
            } else {
              // If userId is already in the array, remove it (unlike)
              post.likes.splice(userIdIndex, 1)
            }
          }
        }
      })
      .addCase(likePost.rejected, (state, action: PayloadAction<unknown>) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          state.error = 'An unknown error occurred'
        }
      })
  }
})

export default postSlice.reducer
