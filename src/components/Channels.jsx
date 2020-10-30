import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel } from '../features/channels/channelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const getClasses = (id) => {
    const buttonType = currentChannelId === id ? 'primary' : 'secondary';
    const classNames = cn('btn', 'mb-3', `btn-${buttonType}`, 'btn-lg');
    return classNames;
  };

  const handleSelectChannel = (e) => {
    e.preventDefault();
    const selectedChannelId = parseInt(e.target.id, 10);
    dispatch(selectChannel(selectedChannelId));
  };

  const renderChannels = channels
    .map((c) => <button
      key={c.name}
      id={c.id}
      className={getClasses(c.id)}
      onClick={handleSelectChannel}
    >
      {c.name}
    </button>);

  return (
    <div className='btn-group-vertical'>
      { renderChannels }
    </div>
  );
};

export default Channels;
