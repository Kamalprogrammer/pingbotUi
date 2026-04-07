import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api`,
        credentials: 'include', // for cookies
    }),
    tagTypes: ['Chat', 'Messages', 'User'],
    endpoints: (builder) => ({
        // Auth endpoints
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),

        // Chat endpoints
        getChats: builder.query({
            query: () => '/chat',
            providesTags: ['Chat'],
        }),
        createChat: builder.mutation({
            query: (chatData) => ({
                url: '/chat',
                method: 'POST',
                body: chatData,
            }),
            invalidatesTags: ['Chat'],
        }),
        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `/chat/${chatId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Chat'],
        }),

        // Messages endpoints
        getMessages: builder.query({
            query: (chatId) => `/chat/${chatId}/messages`,
            providesTags: (result, error, chatId) => [{ type: 'Messages', id: chatId }],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetChatsQuery,
    useCreateChatMutation,
    useDeleteChatMutation,
    useGetMessagesQuery,
} = apiSlice;
