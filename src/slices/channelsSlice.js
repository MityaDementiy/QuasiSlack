import { createSlice, createSelector } from '@reduxjs/toolkit';

const defaultChannel = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
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
    removeChannel(state, action) {
      const id = action.payload;
      const updatedChannelsList = state.channels.filter((channel) => channel.id !== id);
      return { ...state, channels: updatedChannelsList, currentChannelId: defaultChannel };
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const targetChannel = state.channels.find((channel) => channel.id === id);
      targetChannel.name = name;
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = id;
    },
  },
});

export const currentChannelIdSelector = (state) => state.channels.currentChannelId;
export const channelsSelector = (state) => state.channels.channels;

export const {
  selectChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
