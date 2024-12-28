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
      await postApi.likePost(userId, postId)
      return { userId, postId }
    } catch (error: unknown) {
      if (error instanceof AxiosError && 'response' in error) {
        const axiosError = error as { response?: { data: string } }
        return rejectWithValue(axiosError.response?.data || 'Failed to like/unlike post')
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

export const createPost = createAsyncThunk(
  'post/createPost',
  async (
    {
      userId,
      content,
      imageUrl,
      postId,
      sharedPostId,
      travelId
    }: {
      userId: string
      imageUrl: string
      content: string
      postId: null
      sharedPostId: null
      travelId: null
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postApi.createPost({ userId, content, imageUrl, postId, sharedPostId, travelId })
      if (!response?.data || !response.data.id) {
        console.log(response)
        throw new Error('Invalid response from API here ?')
      }
      return response?.data as PostModel
    } catch (error: unknown) {
      if (error instanceof AxiosError && 'response' in error) {
        const axiosError = error as { response?: { data: string } }
        return rejectWithValue(axiosError.response?.data || 'Failed to create new post')
      }
      return rejectWithValue(error)
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
              post.likes = []
            }

            const userIdIndex = post.likes.indexOf(action.payload.userId)

            if (userIdIndex === -1) {
              post.likes.push(action.payload.userId)
            } else {
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
      .addCase(createPost.fulfilled, (state, action: PayloadAction<PostModel>) => {
        const newPost = action.payload

        // Kiểm tra dữ liệu từ API
        if (!newPost || !newPost.id || !newPost.content) {
          console.warn('Invalid post data:', newPost)
          return
        }
        newPost.createdAt = new Date().toISOString()
        // Cập nhật danh sách bài viết
        state.data = state.data ? [...state.data, newPost] : [newPost]

        // Đồng bộ state với dữ liệu mới
        state.isLoading = false

        // Log thông tin để kiểm tra
        console.log('Updated posts state:', state.data)
      })

      .addCase(createPost.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false

        if (typeof action.payload === 'string') {
          state.error = action.payload // Lỗi đã được xử lý bởi rejectWithValue
        } else if (action.payload && typeof action.payload === 'object') {
          // Lưu JSON.stringify để đọc thông tin lỗi chi tiết hơn
          state.error = JSON.stringify(action.payload)
        } else {
          // Log lỗi không mong đợi và lưu thông báo chung
          console.error('Unexpected error payload:', action.payload)
          state.error = 'An unknown error occurred'
        }
      })
  }
})

export default postSlice.reducer
