import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig"; // Utiliser la configuration Axios avec les interceptors

export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/conversation`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createConversation = createAsyncThunk(
  "conversations/createConversation",
  async (senders, { rejectWithValue }) => {
    try {
      const response = await axios.post("/conversations", { senders }); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessageToConversation: (state, action) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(conv => conv._id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.push(action.payload);
      });
  },
});

export const { addMessageToConversation } = conversationSlice.actions;
export default conversationSlice.reducer;