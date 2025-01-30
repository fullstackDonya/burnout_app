import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../utils/interceptor';

export const register = createAsyncThunk(
    'api/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await myAxios.post('/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default registerSlice.reducer;