import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axiosConfig"; 

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId, { getState, rejectWithValue }) => {  // Passer conversationId comme argument
    const { userId, token } = getState().auth;

    if (!userId || !token) {
      return rejectWithValue("Utilisateur non connecté");
    }

    try {
      // Passer conversationId dans l'URL de l'API
      const response = await axios.get(`/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Utiliser le token d'authentification
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);


export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ senders, content }, { rejectWithValue }) => {  
    try {
      const response = await axios.post("/message/send", { senders, content });

      if (response.status !== 201) {
        throw new Error("Erreur lors de la création de la conversation");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages[action.meta.arg] = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversationId, message } = action.payload;
        if (state.messages[conversationId]) {
          state.messages[conversationId].push(message);
        } else {
          state.messages[conversationId] = [message];
        }
      });
  },
});

export default messageSlice.reducer;