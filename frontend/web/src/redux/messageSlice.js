import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/messages/${conversationId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ conversationId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/messages`, { message });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {
    addMessageToConversation: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state[conversationId]) {
        state[conversationId] = [];
      }
      state[conversationId].push(message);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state[action.meta.arg] = action.payload;
      });
  }
});

export const { addMessageToConversation } = messageSlice.actions;
export default messageSlice.reducer;