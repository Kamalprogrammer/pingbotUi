import { io } from "socket.io-client";

// Use the environment variable for backend URL
const SOCKET_URL = import.meta.env.VITE_BASE_URL;

export const socket = io(SOCKET_URL, {
    withCredentials: true, // Required to send cookies (your token)
    autoConnect: false,    // Manually connect when needed
});
