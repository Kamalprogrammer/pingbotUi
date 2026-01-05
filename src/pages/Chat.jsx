import { useState } from "react";
import { Link } from "react-router-dom";

// Sample data for chats (will be replaced with backend data)
const initialChats = [
    { id: "1", title: "How can I help you?", active: true },
    { id: "2", title: "JSON Data for Table", active: false },
    { id: "3", title: "Enhancing Donut Chart", active: false },
    { id: "4", title: "Modern Hero Slider", active: false },
    { id: "5", title: "Tailwind UI Refinement", active: false },
];

export default function Chat() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chats, setChats] = useState(initialChats);
    const [activeChat, setActiveChat] = useState("1");
    const [messages, setMessages] = useState([
        { id: "1", role: "user", content: "hi" },
        { id: "2", role: "model", content: "Hello! It's great to connect with you.\n\nI am ready to assist with whatever is on your mind today, whether you are looking to solve a complex problem, draft some content, or just need a thought partner to brainstorm with.\n\n**How can I help you get started?**\n\n• **Brainstorming:** Do you need ideas for a new project or solution?\n• **Drafting/Editing:** Do you need help writing or refining a document?\n• **Technical Support:** Do you have code to debug or a concept to explore?\n\nWould you like to share what you are working on so we can jump right in?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleNewChat = () => {
        const newChat = {
            id: Date.now().toString(),
            title: "New Chat",
            active: false
        };
        setChats([newChat, ...chats]);
        setActiveChat(newChat.id);
        setMessages([]);
        setIsSidebarOpen(false);
    };

    const handleSelectChat = (chatId) => {
        setActiveChat(chatId);
        setChats(chats.map(c => ({ ...c, active: c.id === chatId })));
        setIsSidebarOpen(false);
        // TODO: Load messages for this chat from backend
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        // TODO: Integrate with socket.io
        // socket.emit('ai-prompt', { chat_id: activeChat, prompt: userMessage.content });

        // Simulate AI response (remove after socket integration)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "model",
                content: "This is a placeholder response. Connect to your backend socket to get real AI responses."
            }]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="h-screen bg-black flex overflow-hidden">
            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
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
                        onClick={() => setIsSidebarOpen(false)}
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
                <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-white/10 md:hidden"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className="text-white font-medium text-sm md:text-base">How Can I Help You?</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-white/60 text-sm hidden sm:block">PRO</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">K</span>
                        </div>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map(message => (
                            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.role === 'model' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                                        <span className="text-white text-xs">✦</span>
                                    </div>
                                )}
                                <div className={`max-w-[85%] md:max-w-[75%] ${message.role === 'user'
                                        ? 'bg-white/10 rounded-2xl rounded-tr-sm px-4 py-3'
                                        : ''
                                    }`}>
                                    <p className="text-white text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                                        {message.content}
                                    </p>
                                    {message.role === 'model' && (
                                        <div className="flex items-center gap-2 mt-3 pt-2">
                                            <button className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                </svg>
                                            </button>
                                            <button className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                                </svg>
                                            </button>
                                            <button className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </button>
                                            <button className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center ml-3">
                                        <span className="text-white text-xs font-semibold">K</span>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                                    <span className="text-white text-xs">✦</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10">
                    <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
                        <div className="relative flex items-center bg-[#1a1a1a] rounded-2xl border border-white/20 focus-within:border-white/40 transition-colors">
                            <button type="button" className="p-3 text-white/50 hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask PingBot..."
                                className="flex-1 bg-transparent text-white placeholder-white/40 py-3 px-2 focus:outline-none text-sm md:text-base"
                            />
                            <div className="flex items-center gap-1 pr-2">
                                <button type="button" className="p-2 text-white/50 hover:text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="p-2 text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="text-center text-white/30 text-xs mt-3">
                        PingBot can make mistakes, so double-check it
                    </p>
                </div>
            </main>
        </div>
    );
}
