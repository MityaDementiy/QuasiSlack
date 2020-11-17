import React from 'react';
import { useSelector } from 'react-redux';

import Channel from './Channel';
import { channelsSelector } from '../slices/channelsSlice';

const Channels = () => {
  const channels = useSelector(channelsSelector);
  return (
    <div className="btn-group-vertical d-block">
      {channels.map((channel) => (
        <Channel
          channel={channel}
          key={`${channel.name}, ${channel.id}`}
        />
      ))}
    </div>
  );
};

export default Channels;
