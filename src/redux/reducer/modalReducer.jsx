import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  selected: null,
  isEditOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    clear: () => initialState,
    handleOpen: (state) => {
      state.open = true;
    },
    handleClose: (state) => {
      state.open = false;
    },
    handleEditClick: (state, action) => {
      state.selected = action.payload;
      state.isEditOpen = true;
    },
    handleEditClose: (state) => {
      state.isEditOpen = false;
    },
  },
});

export const {
  clear,
  handleEditClose,
  handleEditClick,
  handleClose,
  handleOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
