import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Action pour récupérer la liste des utilisateurs connectés
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/online"); // Mets l'URL correcte
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

// Action pour se connecter
export const login = createAsyncThunk(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", credentials);
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }
      const data = response.data;
      await AsyncStorage.setItem('userId', data.userId);
      await AsyncStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

// Action pour se déconnecter
export const logout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().users;
    try {
      await axios.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('token');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

// Action pour s'inscrire
export const register = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", user);
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }
      const data = response.data;
      await AsyncStorage.setItem('userId', data.userId);
      await AsyncStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
    userId: null,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userId = null;
        state.token = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;