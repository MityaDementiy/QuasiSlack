import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'react-feather';
import cn from 'classnames';

import { selectChannel, currentChannelIdSelector } from '../slices/channelsSlice';
import { openModal } from '../slices/modalsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(currentChannelIdSelector);
  const { id: channelId, name: channelName } = channel;

  const handleSelectChannel = (id) => () => {
    dispatch(selectChannel(id));
  };

  const handleShowDeleteModal = () => {
    dispatch(openModal('removing'));
  };

  const handleShowRenameModal = () => {
    dispatch(openModal('renaming'));
  };

  const classNames = cn('btn', 'mb-3', 'btn-lg', {
    'btn-primary': currentChannelId === channelId,
    'btn-secondary': currentChannelId !== channelId,
  });

  if (channel.removable) {
    return (
      <div role="button" type="button" tabIndex={0} className="btn-group" onClick={handleSelectChannel(channelId)} onKeyPress={handleSelectChannel(channelId)} id={channelId}>
        <button type="button" className={classNames}>
          {channelName}
        </button>
        <button type="button" className={classNames} onClick={handleShowDeleteModal}>
          <Trash />
        </button>
        <button type="button" className={classNames} onClick={handleShowRenameModal}>
          <Edit />
        </button>
      </div>
    );
  }
  return (
    <button type="button" id={channelId} className={classNames} onClick={handleSelectChannel(channelId)}>
      {channel.name}
    </button>
  );
};

export default Channel;
