import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './slices/conversationSlice';
import messageReducer from './slices//messageSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    conversations: conversationReducer,
    messages: messageReducer,
    auth: authReducer,
    users: usersReducer
  },
});

export default store;