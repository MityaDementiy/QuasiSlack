import React from 'react';
import cn from 'classnames';

const Channels = ({ channels, currentChannelId }) => {
  const getClasses = (id) => {
    const buttonType = currentChannelId === id ? 'primary' : 'secondary';
    const classNames = cn('btn', 'mb-3', `btn-${buttonType}`);
    return classNames;
  };

  const renderChannels = channels
    .map((c) => <button key={c.name} className={getClasses(c.id)}>{c.name}</button>);

  return (
    <div className='btn-group-vertical'>
      { renderChannels }
    </div>
  );
};

export default Channels;
