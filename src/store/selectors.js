// Selectors for chat state
export const selectChats = (state) => state.chat.chats;
export const selectActiveChat = (state) => state.chat.activeChat;
export const selectMessages = (state) => state.chat.messages;
export const selectActiveChatData = (state) => {
    const activeId = state.chat.activeChat;
    return state.chat.chats.find(c => c.id === activeId);
};

// Selectors for socket state
export const selectConnectionStatus = (state) => state.socket.connectionStatus;
export const selectIsSending = (state) => state.socket.isSending;
export const selectIsConnected = (state) => state.socket.connectionStatus === 'connected';

// Selectors for UI state
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectShowNewChatModal = (state) => state.ui.showNewChatModal;
export const selectNewChatName = (state) => state.ui.newChatName;
