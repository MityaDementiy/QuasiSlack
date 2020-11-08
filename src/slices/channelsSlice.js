import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: defaultChannel,
  },
  reducers: {
    selectChannel(state, action) {
      const id = action.payload;
      return { ...state, currentChannelId: id };
    },
    addChannel(state, action) {
      const channel = action.payload;
      const { channels } = state;
      channels.push(channel);
    },
    initChannels(state, action) {
      const currentChannels = action.payload;
      return { ...state, channels: currentChannels };
    },
    removeChannel(state, action) {
      const id = action.payload;
      const newChannels = state.channels.filter((c) => c.id !== id);
      return { ...state, channels: newChannels, currentChannelId: 1 };
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const targetChannel = state.channels.find((c) => c.id === id);
      targetChannel.name = name;
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = id;
    },
  },
});

export const {
  selectChannel, addChannel, initChannels, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
