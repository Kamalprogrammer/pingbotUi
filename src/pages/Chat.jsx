import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    addChat,
    setActiveChat,
    addMessage,
    clearMessages,
} from "../store/slices/chatSlice";
import {
    markConnected,
    markDisconnected,
    setIsSending,
} from "../store/slices/socketSlice";
import {
    setIsSidebarOpen,
    setShowNewChatModal,
    setNewChatName,
    resetNewChatModal,
} from "../store/slices/uiSlice";

export default function Chat() {
    const dispatch = useDispatch();
    
    // Select state from Redux store
    const { chats, activeChat, messages } = useSelector((state) => state.chat);
    const { connectionStatus, isSending } = useSelector((state) => state.socket);
    const { isSidebarOpen, showNewChatModal, newChatName } = useSelector((state) => state.ui);

    const activeChatTitle = useMemo(() => {
        const found = chats.find(c => c.id === activeChat);
        return found ? found.title : "New Chat";
    }, [activeChat, chats]);

    const handleNewChat = () => {
        dispatch(setShowNewChatModal(true));
    };

    const createNewChat = () => {
        if (!newChatName.trim()) return;
        
        const newChat = {
            id: Date.now().toString(),
            title: newChatName.trim(),
            active: false
        };
        
        dispatch(addChat(newChat));
        dispatch(setActiveChat(newChat.id));
        dispatch(clearMessages());
        dispatch(setIsSidebarOpen(false));
        dispatch(resetNewChatModal());
    };

    const cancelNewChat = () => {
        dispatch(resetNewChatModal());
    };

    const handleSelectChat = (chatId) => {
        dispatch(setActiveChat(chatId));
        dispatch(setIsSidebarOpen(false));
        // Hook: load chat history for chatId from your socket or REST endpoint
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const inputElement = e.target.elements.messageInput;
        const inputValue = inputElement.value;
        
        if (!inputValue.trim() || isSending) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue.trim()
        };

        dispatch(addMessage(userMessage));
        inputElement.value = "";
        dispatch(setIsSending(true));

        // Hook: emit the message over your socket implementation
        // Example:
        // socket.emit('ai-prompt', { chat_id: activeChat, prompt: userMessage.content });

        // Stop the sending state once your socket acknowledges
        // socket.on('ack', () => dispatch(setIsSending(false)));
        dispatch(setIsSending(false));
    };

    // Call this when a socket message arrives
    const handleIncomingMessage = (incoming) => {
        dispatch(addMessage({
            id: incoming.id ?? Date.now().toString(),
            role: incoming.role ?? "model",
            content: incoming.content ?? ""
        }));
    };

    // Call these from your socket lifecycle handlers
    const handleMarkConnected = () => dispatch(markConnected());
    const handleMarkDisconnected = () => dispatch(markDisconnected());

    return (
        <div className="h-screen bg-black flex overflow-hidden">
            {/* New Chat Modal */}
            {showNewChatModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0f0f11] border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="text-white font-semibold text-lg mb-2">Create New Chat</h2>
                        <p className="text-white/60 text-xs mb-4">This will appear at the top of your chat list</p>
                        <input
                            type="text"
                            value={newChatName}
                            onChange={(e) => dispatch(setNewChatName(e.target.value))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && newChatName.trim()) {
                                    createNewChat();
                                } else if (e.key === 'Escape') {
                                    cancelNewChat();
                                }
                            }}
                            placeholder="e.g., Project Planning, Code Review..."
                            autoFocus
                            className="w-full bg-[#1a1a1a] text-white placeholder-white/40 px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none text-sm"
                        />
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={cancelNewChat}
                                className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={createNewChat}
                                disabled={!newChatName.trim()}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-white text-black hover:bg-white/90 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => dispatch(setIsSidebarOpen(false))}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative z-50 h-full w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                {/* Sidebar Header */}
                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                            <span className="text-black font-bold text-sm">P</span>
                        </div>
                        <span className="text-white font-semibold">PingBot</span>
                    </Link>
                    <button
                        onClick={() => dispatch(setIsSidebarOpen(false))}
                        className="p-1.5 rounded-lg hover:bg-white/10 md:hidden"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* New Chat Button */}
                <div className="p-3">
                    <button
                        onClick={handleNewChat}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New chat
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto px-2">
                    {chats.map(chat => (
                        <button
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 text-sm truncate transition-colors ${activeChat === chat.id
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {chat.title}
                        </button>
                    ))}
                </div>

                {/* Settings */}
                <div className="p-3 border-t border-white/10">
                    <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings and help
                    </button>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col h-full">
                {/* Header */}
                <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b border-white/10 bg-black/60 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => dispatch(setIsSidebarOpen(true))}
                            className="p-2 rounded-lg hover:bg-white/10 md:hidden"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-white font-semibold text-sm md:text-base">{activeChatTitle}</p>
                            <p className="text-white/50 text-xs">Ready for socket wiring: emit, ack, and stream responses.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${connectionStatus === "connected" ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/70"}`}>
                            {connectionStatus === "connected" ? "Connected" : "Disconnected"}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">K</span>
                        </div>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-black via-[#0b0b0b] to-black">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {messages.length === 0 && (
                            <div className="border border-dashed border-white/20 rounded-2xl p-6 text-center text-white/60">
                                <p className="font-semibold text-white">No messages yet</p>
                                <p className="text-sm mt-2">Connect your socket, load history on select, and push incoming events into <span className="font-mono text-white">handleIncomingMessage</span>.</p>
                            </div>
                        )}

                        {messages.map(message => (
                            <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.role === 'model' && (
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                        <span className="text-white text-xs">AI</span>
                                    </div>
                                )}
                                <div className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-lg ${message.role === 'user'
                                        ? 'bg-white/10 border border-white/15 rounded-tr-sm'
                                        : 'bg-[#0f0f11] border border-white/10 rounded-tl-sm'
                                    }`}>
                                    <p className="text-white text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                                        {message.content}
                                    </p>
                                </div>
                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                                        <span className="text-white text-xs font-semibold">You</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-black/80 backdrop-blur">
                    <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto space-y-3">
                        <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: connectionStatus === "connected" ? '#22c55e' : '#f97316' }}></span>
                                <span>{connectionStatus === "connected" ? "Socket ready" : "Waiting for socket"}</span>
                            </div>
                            <span>•</span>
                            <span>Use handleIncomingMessage to append streamed tokens.</span>
                        </div>

                        <div className="relative flex items-center bg-[#111111] rounded-2xl border border-white/15 focus-within:border-white/40 transition-colors">
                            <button type="button" className="p-3 text-white/50 hover:text-white" onClick={handleMarkConnected}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                name="messageInput"
                                placeholder="Ask PingBot..."
                                className="flex-1 bg-transparent text-white placeholder-white/40 py-3 px-2 focus:outline-none text-sm md:text-base"
                            />
                            <div className="flex items-center gap-1 pr-2">
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="p-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-white/40 text-xs">
                            <span>Wire up:</span>
                            <span className="font-mono text-white">socket.emit('ai-prompt')</span>
                            <span>•</span>
                            <span className="font-mono text-white">socket.on('ai-response', handleIncomingMessage)</span>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
