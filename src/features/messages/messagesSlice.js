import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      const message = action.payload;
      state.messages.push(message);
    },
    initMessages(state, action) {
      const messages = action.payload;
      const key = 'messages';
      return update(state, { [key]: { $set: messages } });
    },
  },
});

export const { addMessage, initMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
