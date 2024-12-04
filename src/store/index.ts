// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
