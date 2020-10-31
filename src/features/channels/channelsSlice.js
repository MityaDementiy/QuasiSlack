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
      state.channels.push(channel);
    },
    initChannels(state, action) {
      const channels = action.payload;
      const key = 'channels';
      return update(state, { [key]: { $set: channels } });
    },
  },
});

export const { selectChannel, addChannel, initChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
