import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    modalType: null,
  },
  reducers: {
    openModal(state, action) {
      const actionType = action.payload;
      const key = 'modalType';
      return update(state, { [key]: { $set: actionType } });
    },
    closeModal(state) {
      const key = 'modalType';
      return update(state, { [key]: { $set: null } });
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
