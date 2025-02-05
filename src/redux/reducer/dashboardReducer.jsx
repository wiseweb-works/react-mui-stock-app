import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  categories: [],
  brands: [],
  firms: [],
  products: [],
  purchases: [],
  sales: [],
};

const API_URL = import.meta.env.VITE_API_URL;

export const getItem = createAsyncThunk(
  'dashboard/getItem',
  async ({ item, token }, { rejectWithValue }) => {
    try {
      const response = await axios(`${API_URL}/${item}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemKey = action.meta.arg.item;
        state[itemKey] = action.payload.data;
      });
  },
});

export const { clear } = dashboardSlice.actions;

export default dashboardSlice.reducer;
