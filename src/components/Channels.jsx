import React from 'react';

const Channels = ({ channels }) => {
  const renderChannels = channels.map((channel) => <li key={channel.name} className='list-group-item'><a href='#'>{channel.name}</a></li>);

  return (
    <ul className='list-group list-group-flush'>
      { renderChannels}
    </ul>
  );
};

export default Channels;
