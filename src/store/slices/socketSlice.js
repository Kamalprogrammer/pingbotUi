import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    connectionStatus: 'disconnected', // 'connected' | 'disconnected' | 'connecting'
    isSending: false,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setConnectionStatus: (state, action) => {
            state.connectionStatus = action.payload;
        },
        setIsSending: (state, action) => {
            state.isSending = action.payload;
        },
        markConnected: (state) => {
            state.connectionStatus = 'connected';
        },
        markDisconnected: (state) => {
            state.connectionStatus = 'disconnected';
        },
        markConnecting: (state) => {
            state.connectionStatus = 'connecting';
        },
    },
});

export const {
    setConnectionStatus,
    setIsSending,
    markConnected,
    markDisconnected,
    markConnecting,
} = socketSlice.actions;

export default socketSlice.reducer;
