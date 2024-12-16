// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';
import travelReducer from './travel.slice';
import bookingReducer from './booking.slice';

export const store = configureStore({
    reducer: {
        travels: travelReducer,
        user: userReducer,
        bookings: bookingReducer,
    },
});

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
