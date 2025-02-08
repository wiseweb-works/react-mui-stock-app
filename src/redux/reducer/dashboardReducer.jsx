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

export const createItem = createAsyncThunk(
  'dashboard/createItem',
  async ({ item, info, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/${item}/`, info, {
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

export const deleteItem = createAsyncThunk(
  'dashboard/deleteItem',
  async ({ item, id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${item}/${id}`, {
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
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemKey = action.meta.arg.item;
        const id = action.meta.arg.id;
        state[itemKey] = [...state[itemKey], action.meta.arg.info];
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemKey = action.meta.arg.item;
        const id = action.meta.arg.id;
        state[itemKey] = state[itemKey].filter((item) => item._id !== id);
      });
  },
});

export const { clear } = dashboardSlice.actions;

export default dashboardSlice.reducer;
