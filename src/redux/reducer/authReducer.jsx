import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showToast } from '../../components/ToastNotification';

const initialState = {
  user: '',
  loading: false,
  error: false,
  token: '',
};

const API_URL = import.meta.env.VITE_API_URL;

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/`, userInfo);
      showToast('success', 'Kullanıcı başarıyla oluşturuldu!');
      return response.data;
    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message || 'Kullanıcı oluşturulamadı!'
      );
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, values);
      showToast('success', 'Başarıyla oturum açıldı!');
      console.log(response.data);
      return response.data;
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Oturum açılmaadı!');
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios(`${API_URL}/auth/logout`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      showToast('success', 'Başarıyla oturum kapatıldı!');
      console.log(response.data);
      return response.data;
    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message || 'Oturum kapatılamadı!'
      );
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.username;
        state.token = action.payload.token;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user.username;
        state.token = action.payload.token;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = '';
        state.token = '';
      });
  },
});

export const { clear } = authSlice.actions;

export default authSlice.reducer;
