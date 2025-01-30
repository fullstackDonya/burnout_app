import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import messageReducer from './messageSlice';

const store = configureStore({
  reducer: {
    conversations: conversationReducer,
    messages: messageReducer,
  },
});

export default store;