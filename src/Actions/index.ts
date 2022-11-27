import { createAction } from '@reduxjs/toolkit';
import { chatType, user } from '../Interface';

export const addChat = createAction<chatType, 'ADD_CHAT'>('ADD_CHAT');
export const userData = createAction<user, 'USER_DATA'>('USER_DATA');
