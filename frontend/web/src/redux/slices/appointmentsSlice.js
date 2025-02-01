import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

export const fetchUserAppointments = createAsyncThunk(
  'appointments/fetchUserAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/appointments/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.data.appointments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/appointment', appointmentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.data.appointment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;