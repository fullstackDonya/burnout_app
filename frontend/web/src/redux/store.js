import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './slices/conversationSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import messageReducer from './slices//messageSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import contactsReducer from './slices/contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    appointments: appointmentsReducer,
    conversations: conversationReducer,
    messages: messageReducer,
    auth: authReducer,
    users: usersReducer
  },
});

export default store;