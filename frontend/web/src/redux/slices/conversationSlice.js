import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig"; // Utiliser la config Axios

// Récupérer les conversations de l'utilisateur connecté
// Fonction pour récupérer les conversations
export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (_, { getState, rejectWithValue }) => {
    const { userId, token } = getState().auth; 
    
    if (!userId || !token) {
      return rejectWithValue("Utilisateur non connecté");
    }

    try {
      const response = await axios.get(`/conversations`); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

// Créer une conversation
export const createConversation = createAsyncThunk(
  "conversations/create",
  async ({ senders }, { rejectWithValue }) => {  
    try {
      const response = await axios.post("/conversations", { senders });

      if (response.status !== 201) {
        throw new Error("Erreur lors de la création de la conversation");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur serveur");
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
