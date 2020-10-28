import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [{ id: 1, name: 'general', removable: false }, { id: 2, name: 'random', removable: false }],
    currentChannelId: 1,
  },
});

export default channelsSlice.reducer;
