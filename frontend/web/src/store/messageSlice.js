import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ⚡ Récupérer les messages d'une conversation
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8082/messages/${conversationId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ⚡ Envoyer un message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ conversationId, senderId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8082/messages", {
        conversation: conversationId,
        sender: senderId,
        content,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🎯 Slice Redux
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // 🔄 Chargement des messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Envoi d'un message
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default messageSlice.reducer;
