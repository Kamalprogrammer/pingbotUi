import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidebarOpen: false,
    showNewChatModal: false,
    newChatName: '',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setShowNewChatModal: (state, action) => {
            state.showNewChatModal = action.payload;
        },
        setNewChatName: (state, action) => {
            state.newChatName = action.payload;
        },
        resetNewChatModal: (state) => {
            state.showNewChatModal = false;
            state.newChatName = '';
        },
    },
});

export const {
    setIsSidebarOpen,
    toggleSidebar,
    setShowNewChatModal,
    setNewChatName,
    resetNewChatModal,
} = uiSlice.actions;

export default uiSlice.reducer;
