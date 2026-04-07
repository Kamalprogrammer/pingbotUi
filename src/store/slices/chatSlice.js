import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: [
        { id: "1", title: "How can I help you?", active: true },
        { id: "2", title: "JSON Data for Table", active: false },
        { id: "3", title: "Enhancing Donut Chart", active: false },
        { id: "4", title: "Modern Hero Slider", active: false },
        { id: "5", title: "Tailwind UI Refinement", active: false },
    ],
    activeChat: "1",
    messages: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        addChat: (state, action) => {
            state.chats.unshift(action.payload);
        },
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
            state.chats = state.chats.map(c => ({
                ...c,
                active: c.id === action.payload
            }));
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
         deleteChat: (state, action) => {
            const chatId = action.payload;
            state.chats = state.chats.filter(c => c.id !== chatId);
            // If deleted chat was active, switch to first available chat
            if (state.activeChat === chatId) {
                state.activeChat = state.chats.length > 0 ? state.chats[0].id : null;
                state.messages = [];
            }
        },
    },
});

export const {
    setChats,
    addChat,
    setActiveChat,
    setMessages,
    addMessage,
    clearMessages,
    deleteChat,
} = chatSlice.actions;

export default chatSlice.reducer;
