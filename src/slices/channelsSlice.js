import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [{ id: 1, name: 'general', removable: false }, { id: 2, name: 'random', removable: false }],
    currentChannelId: 1,
  },
  reducers: {
    selectChannel(state, action) {
      const id = action.payload;
      const key = 'currentChannelId';
      return update(state, { [key]: { $set: id } });
    },
    addChannel(state, action) {
      const channel = action.payload;
      const { channels } = state;
      channels.push(channel);
      const key = 'channels';
      return update(state, { [key]: { $set: channels } });
    },
    initChannels(state, action) {
      const currentChannels = action.payload;
      const channels = 'channels';
      return update(state, { [channels]: { $set: currentChannels } });
    },
    removeChannel(state, action) {
      const id = action.payload;
      const newChannels = state.channels.filter((c) => c.id !== id);
      const channels = 'channels';
      const currentChannelId = 'currentChannelId';
      return update(state, { [channels]: { $set: newChannels }, [currentChannelId]: { $set: 1 } });
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
