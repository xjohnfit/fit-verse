import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import {
    setOnlineUsers,
    setConnected,
    setDisconnected,
} from '@/slices/socketSlice';
import { SERVER_URL } from '@/lib/apiConfig';

let socket: Socket | null = null;

// Chosen in lib/apiConfig.ts: your local backend in development, the live API in EAS builds
const SOCKET_URL = SERVER_URL;

export const useSocket = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: any) => state.auth);
    const { onlineUsers, isConnected } = useSelector(
        (state: any) => state.socket,
    );

    useEffect(() => {
        if (userInfo && !socket) {
            // Initialize socket connection
            socket = io(SOCKET_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling'],
            });

            socket.on('connect', () => {
                dispatch(setConnected());

                // Notify server that user is online
                if (userInfo._id) {
                    socket?.emit('user-online', userInfo._id);
                }
            });

            socket.on('disconnect', () => {
                dispatch(setDisconnected());
            });

            socket.on('online-users', (users: string[]) => {
                dispatch(setOnlineUsers(users));
            });

            socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });

            return () => {
                if (socket) {
                    socket.disconnect();
                    socket = null;
                }
            };
        }

        // Cleanup on logout
        if (!userInfo && socket) {
            socket.disconnect();
            socket = null;
            dispatch(setDisconnected());
        }
    }, [userInfo, dispatch]);

    return { socket, onlineUsers, isConnected };
};

export const getSocket = (): Socket | null => {
    return socket;
};
