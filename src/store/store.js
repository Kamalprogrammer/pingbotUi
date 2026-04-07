import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import socketReducer from './slices/socketSlice';
import uiReducer from './slices/uiSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        socket: socketReducer,
        ui: uiReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
