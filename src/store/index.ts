// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user.slice'
import travelSlice from './travel.slice'
import bookingSlice from './booking.slice'
import postSlice from './post.slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    travels: travelSlice,
    bookings: bookingSlice,
    posts: postSlice
  }
})

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
