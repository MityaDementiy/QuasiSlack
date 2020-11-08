import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

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
      const currentMessages = action.payload;
      return { ...state, messages: currentMessages };
    },
  },
  extraReducers: {
    [removeChannel]: (state, action) => {
      const id = action.payload;
      const newMessages = state.messages.filter((m) => m.channelId !== id);
      return { ...state, messages: newMessages };
    },
  },
});

export const { addMessage, initMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
