import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    modalType: null,
  },
  reducers: {
    openModal(state, action) {
      const actionType = action.payload;
      return { ...state, modalType: actionType };
    },
    closeModal(state) {
      return { ...state, modalType: null };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
