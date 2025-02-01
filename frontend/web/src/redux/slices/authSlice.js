import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    try {
      await axios.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("token", action.payload.token);
    },
    clearCredentials: (state) => {
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userId = null;
        state.token = null;
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;