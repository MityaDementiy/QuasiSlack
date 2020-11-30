import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'react-feather';
import cn from 'classnames';

import { selectChannel, currentChannelIdSelector } from '../slices/channelsSlice';
import { openModal } from '../slices/modalsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(currentChannelIdSelector);
  const { id: channelId, name: channelName, removable: isRemovable } = channel;

  const handleSelectChannel = (id) => () => {
    dispatch(selectChannel(id));
  };

  const handleShowModal = (modalType) => () => {
    dispatch(openModal(modalType));
  };

  const classNames = cn('btn', 'mb-3', 'btn-lg', {
    'btn-primary': currentChannelId === channelId,
    'btn-secondary': currentChannelId !== channelId,
  });

  if (isRemovable) {
    return (
      <div role="button" type="button" tabIndex={0} className="btn-group" onClick={handleSelectChannel(channelId)} onKeyPress={handleSelectChannel(channelId)} id={channelId}>
        <button type="button" className={classNames}>
          {channelName}
        </button>
        <button type="button" className={classNames} onClick={handleShowModal('removing')}>
          <Trash />
        </button>
        <button type="button" className={classNames} onClick={handleShowModal('renaming')}>
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
