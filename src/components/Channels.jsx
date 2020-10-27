import React from 'react';

const Channels = ({ channels }) => {
  const renderChannels = channels.map((channel) => <button key={channel.name} className='btn btn-secondary mb-3'>{channel.name}</button>);

  return (
    <div className='btn-group-vertical'>
      { renderChannels}
    </div>
  );
};

export default Channels;
