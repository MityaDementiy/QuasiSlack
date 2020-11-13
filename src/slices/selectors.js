import { createSelector } from '@reduxjs/toolkit';

const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getMessages = (state) => state.messages;
const getChannels = (state) => state.channels.channels;

export const currentChannelMessagesSelector = createSelector(
  [getMessages, getCurrentChannelId],
  (messages, currentChannelId) => messages.filter((m) => m.channelId === currentChannelId),
);

export const currentChannelSelector = createSelector(
  [getChannels, getCurrentChannelId],
  (currentChannels, currentChannelId) => currentChannels.find((c) => c.id === currentChannelId),
);

export const currentChannelsSelector = createSelector(
  getChannels,
  (currentChannels) => currentChannels,
);
