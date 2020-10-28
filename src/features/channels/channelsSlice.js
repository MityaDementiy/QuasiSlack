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
  },
});

export const { selectChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
