// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';
import travelReducer from './travel.slice';

export const store = configureStore({
    reducer: {
        travels: travelReducer,
        user: userReducer,
    },
});

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
