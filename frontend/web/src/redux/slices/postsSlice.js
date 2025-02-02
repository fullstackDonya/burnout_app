import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('/posts');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Erreur serveur');
      }
    }
  );
  
export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ id, postData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/post/${id}`, postData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Erreur serveur');
      }
    }
  );
  
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`/post/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Erreur serveur');
      }
    }
  );
  

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;