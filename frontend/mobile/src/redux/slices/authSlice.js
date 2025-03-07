import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    try {
      await axios.post('/logout', null, {
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
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register', user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const convertImageToBW = createAsyncThunk(
  'auth/convertImageToBW',
  async ({ imagePath, outputPath }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/convert-to-bw', { imagePath, outputPath });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userId: null,
  token: null,
  loading: false,
  error: null,
  convertedImagePath: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      AsyncStorage.setItem('userId', action.payload.userId);
      AsyncStorage.setItem('token', action.payload.token);
    },
    clearCredentials: (state) => {
      state.userId = null;
      state.token = null;
      AsyncStorage.removeItem('userId');
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, async (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        await AsyncStorage.setItem('userId', action.payload.userId);
        await AsyncStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, async (state) => {
        state.userId = null;
        state.token = null;
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('token');
      })
      .addCase(convertImageToBW.fulfilled, (state, action) => {
        state.convertedImagePath = action.payload.outputPath;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;