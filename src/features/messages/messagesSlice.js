import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { removeChannel } from '../channels/channelsSlice';

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
  extraReducers: {
    [removeChannel]: (state, action) => {
      const id = action.payload;
      const newMessages = state.messages.filter((m) => m.channelId !== id);
      const key = 'messages';
      return update(state, { [key]: { $set: newMessages } });
    },
  },
});

export const { addMessage, initMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
