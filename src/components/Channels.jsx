import React from 'react';
import { useSelector } from 'react-redux';

import Channel from './Channel';
import { currentChannelsSelector } from '../slices/selectors';

const Channels = () => {
  const channels = useSelector(currentChannelsSelector);
  return (
    <div className='btn-group-vertical d-block'>
      {channels.map((channel) => <Channel
        channel={channel} key={`${channel.name}, ${channel.id}`}
      />)}
    </div>
  );
};

export default Channels;
