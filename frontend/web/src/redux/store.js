import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import messageReducer from './messageSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    conversations: conversationReducer,
    messages: messageReducer,
    auth: authReducer,
  },
});

export default store;